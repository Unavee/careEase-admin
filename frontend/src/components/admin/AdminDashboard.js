import { useState } from "react";
import Sidebar from "./Sidebar";
import WidgetStats from "./WidgetStats";
import Traffic from "./Traffic";
import TrafficSale from "./TrafficSale";
import PatientTable from "./PatientTable";
import CaregiversTable from "./CaregiverTable";
//import PendingCaregivers from "./PendingCaregivers";
import PendingCaregivers from "./PendingCaregivers";

const AdminDashboard = () => {
 
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const components = {
    Dashboard: <WidgetStats />,
    CareGiver: <CaregiversTable />,
    Pendings: <PendingCaregivers/>,
    Patients: <PatientTable />,
   
    Reports: <TrafficSale />,
  };

  console.log("Dashboard -> setSelectedComponent:", setSelectedComponent);

  return (
    <div className="flex h-screen custom-scrollbar">
      {/*  Pass setSelectedComponent properly */}
     
      <Sidebar setSelectedComponent={setSelectedComponent} />
      
      <main className="flex-1 p-6 overflow-y-auto overflow-x-visible custom-scrollbar ">
    
  <div className="rounded-lg flex border-2 items-center justify-between font-semibold p-2">
  <h1 className="text-blue-800 text-2xl">Admin Dashboard</h1>
  <img src="/care.png" alt="CareEase" className="object-contain h-16 w-auto" />
</div>

        {components[selectedComponent] || <WidgetStats />}
      </main>
    </div>
  );
};

export default AdminDashboard;
