const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin SDK
const serviceAccount = require("./careease-6b3cb-firebase-adminsdk-55vvr-e72579afbd.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();  // Realtime Database
const firestore = admin.firestore(); // Firestore
const auth = admin.auth();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// File uploads directory setup
const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Middleware to verify Firebase token
const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access denied, no token provided" });

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Routes

// Signup user
app.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Input validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new Firebase user
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Save user data to Firebase Database
    await db.ref(`users/${userRecord.uid}`).set({
      firstName,
      lastName,
      email,
      password, // It is generally not recommended to save passwords directly; consider hashing it
    });

    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error("Error during signup:", err);

    if (err.code === "auth/email-already-exists") {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

// Login user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Login logic can happen client-side, the backend does not directly handle Firebase Auth login
    res.status(200).json({ success: true, message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Get products
app.get("/api/products", async (req, res) => {
  try {
    const snapshot = await db.ref("products").once("value");
    const products = snapshot.val();

    if (products) {
      const productsArray = Object.keys(products).map(key => ({
        _id: key,
        ...products[key],
      }));
      return res.status(200).json({ products: productsArray });
    }

    res.status(404).json({ message: "No products found" });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

// Upload product image
app.post("/api/upload", upload.single("productImage"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ message: "File uploaded successfully", imageUrl });
  } catch (err) {
    res.status(500).json({ message: "Error uploading file", error: err.message });
  }
});

// Route to get categories from Firebase
app.get("/api/categories", async (req, res) => {
  try {
    const snapshot = await db.ref("categories").once("value");
    const categories = snapshot.val();

    if (categories) {
      const categoriesArray = Object.keys(categories).map(key => ({
        _id: key,
        ...categories[key],
      }));
      return res.status(200).json({ categories: categoriesArray });
    }

    return res.status(404).json({ message: "No categories found" });
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
});


app.get("/api/pincodes", async (req, res) => {
  try {
    const pincodesRef = db.ref("pincodes");
    const snapshot = await pincodesRef.once("value");
    const pincodes = snapshot.val();

    if (pincodes) {
      const locations = Object.keys(pincodes).map((key) => ({
        name: key.replace("_", " "),
        pincodes: pincodes[key],
      }));
      res.json(locations);
    } else {
      res.status(404).json({ message: "No pincodes found" });
    }
  } catch (error) {
    console.error("Error fetching pincodes:", error);
    res.status(500).json({ message: "Unable to fetch pincodes" });
  }
});






app.get("/api/users", async (req, res) => {
  const { email } = req.query;
  console.log("Email received in query:", email); // Debugging log

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const userSnapshot = await db
  .ref("users")
  .orderByChild("email")
  .equalTo(normalizedEmail)
  .once("value");

console.log("User snapshot:", userSnapshot.val()); // Debugging log


    if (!userSnapshot.exists()) {
      console.warn("User not found for email:", normalizedEmail); // Debugging log
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userSnapshot.val();
    const user = Object.keys(userData).map((key) => ({
      ...userData[key],
      userId: key,
    }))[0];

    console.log("User data returned:", user); // Debugging log
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user data:", err.message); // Debugging log
    res.status(500).json({ message: "Error fetching user data", error: err.message });
  }
});


// Update user details
app.put("/api/user/:uid", async (req, res) => {
  const { uid } = req.params;
  const updates = req.body;

  try {
    await db.ref(`users/${uid}`).update(updates);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

// Get user profile by UID (using Firestore)
app.get('/api/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the user document from Firestore
    const userRef = firestore.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




// Get forms submitted by user
app.get("/api/forms/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const formsSnapshot = await db.ref(`forms/${uid}`).once("value");
    const forms = formsSnapshot.val() || [];
    res.status(200).json({ forms });
  } catch (err) {
    res.status(500).json({ message: "Error fetching forms", error: err.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
