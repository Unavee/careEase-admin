import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";   


import AdminDashboard from "./components/admin/AdminDashboard";


import Footer from "./components/admin/Footer";

const App = () => {
  return (
   
    <Router>
     
     <AdminDashboard/>
     
     <Footer/>
    </Router>
    
  );
};

export default App;
