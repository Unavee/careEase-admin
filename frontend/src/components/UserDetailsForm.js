import React, { useState } from "react";
import { updateUserDetails } from "../api";

const UserDetailsForm = ({ userDetails, setUserDetails }) => {
    const [formData, setFormData] = useState(userDetails);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = await updateUserDetails(userDetails.uid, formData);
        setUserDetails({ ...userDetails, ...formData });
        alert(updatedData.message);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">User Details</h2>
            <div>
                <label className="block">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label className="block">Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
                Update
            </button>
        </form>
    );
};

export default UserDetailsForm;
