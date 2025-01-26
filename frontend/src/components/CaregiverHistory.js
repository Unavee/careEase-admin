import React from "react";

const CaregiverHistory = ({ history }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Caregiver History</h2>
            {history.length > 0 ? (
                <ul className="list-disc ml-5">
                    {history.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No caregivers applied yet.</p>
            )}
        </div>
    );
};

export default CaregiverHistory;
