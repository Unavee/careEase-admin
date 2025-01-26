const API_BASE = "http://localhost:5000/api";

export const fetchUserDetails = async (uid) => {
    const response = await fetch(`${API_BASE}/user/${uid}`);
    return response.json();
};

export const updateUserDetails = async (uid, updates) => {
    const response = await fetch(`${API_BASE}/user/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    return response.json();
};

export const fetchCaregiverHistory = async (uid) => {
    const response = await fetch(`${API_BASE}/caregivers/${uid}`);
    return response.json();
};
