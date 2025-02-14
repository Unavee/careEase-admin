import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertTriangle, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access state

const StatsCard = ({ icon: Icon, count, label, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg outline-dashed outline-primary-blue">
    <div className="flex items-center gap-2">
      <Icon className={color} />
      <span className="text-3xl text-black font-bold">{count}</span>
    </div>
    <p className="text-black text-lg font-semibold mt-2">{label}</p>
  </div>
);

const Badge = ({ children, variant }) => {
  const variants = {
    cancelled: "text-red-400",
    pending: "text-yellow-400",
    scheduled: "text-green-400"
  };

  return (
    <span className={`inline-flex items-center gap-1 ${variants[variant]}`}>
      <span className="w-2 h-2 rounded-full bg-current"></span>
      {children}
    </span>
  );
};

const Button = ({ children, variant, onClick }) => {
  const variants = {
    schedule: "text-green-400 hover:text-green-300",
    cancel: "text-red-400 hover:text-red-300"
  };

  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1.5 font-medium ${variants[variant]} transition-colors`}
    >
      {children}
    </button>
  );
};

const AppointmentDashboard = () => {
  const location = useLocation(); // Access the location state
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Harthik Pandey",
      status: "pending",
      date: "Jun 28, 2024",
      time: "9:30 AM",
    },
    {
      id: 2,
      patient: "Priyanka",
      status: "pending",
      date: "Jun 13, 2024",
      time: "12:00 PM",
    },
    {
      id: 3,
      patient: "Shakshi",
      status: "pending",
      date: "Jun 13, 2024",
      time: "12:00 PM",
    }
  ]);

  // Check if patient details are passed from Chatbot
  useEffect(() => {
    if (location.state?.patient) {
      const { patient } = location.state;
      const newAppointment = {
        id: appointments.length + 1,
        patient: patient.name,
        status: "pending",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        
        phone: patient.phone
      };
      setAppointments([...appointments, newAppointment]);
    }
  }, [location.state]);

  const statusCounts = appointments.reduce((counts, appointment) => {
    counts[appointment.status] = (counts[appointment.status] || 0) + 1;
    return counts;
  }, { scheduled: 0, pending: 0, cancelled: 0 });

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, status: newStatus } : appointment
    ));
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Welcome 👋</h1>
          <p className="text-gray-400">Start the day with managing new appointments</p>
        </div>
        <span className="relative text-lg text-transparent bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text border-2 border-transparent p-[2px] before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-gradient-to-r before:from-blue-500 before:to-purple-500 before:-z-10">
          Caregiver Dashboard
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatsCard icon={Calendar} count={statusCounts.scheduled} label="Scheduled appointments" color="text-blue-400" />
        <StatsCard icon={Clock} count={statusCounts.pending} label="Pending appointments" color="text-yellow-400" />
        <StatsCard icon={AlertTriangle} count={statusCounts.cancelled} label="Cancelled appointments" color="text-red-400" />
      </div>

      <div className="bg-white rounded-lg overflow-hidden w-full overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-primary-blue">
              <th className="p-4 text-white">ID</th>
              <th className="p-4 text-white">Patient</th>
              <th className="p-4 text-white">Status</th>
              <th className="p-4 text-white">Appointment</th>
              <th className="p-4 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b border-gray-700">
                <td className="p-4 text-gray-800 font-semibold text-center">{appointment.id}</td>
                <td className="p-4 text-gray-800 font-semibold text-center">{appointment.patient}</td>
                <td className="p-4 text-gray-800 font-semibold text-center">
                  <Badge variant={appointment.status}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </td>
                <td className="p-4 text-gray-800 font-semibold text-center">{appointment.date}, {appointment.time}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {appointment.status === 'scheduled' && (
                      <div className="flex gap-2 mt-2">
                        <a href={`tel:${appointment.phone}`} onClick={() => handleStatusChange(appointment.id, 'scheduled')} className="text-green-500 flex items-center">
                          <Phone className="w-5 h-5 mr-2" /> Call Patient
                        </a>
                      </div>
                    )}
                    {appointment.status === 'pending' && (
                      <>
                        <Button variant="schedule" onClick={() => handleStatusChange(appointment.id, 'scheduled')}>Schedule</Button>
                        <Button variant="cancel" onClick={() => handleStatusChange(appointment.id, 'cancelled')}>Cancel</Button>
                      </>
                    )}
                    {appointment.status === 'cancelled' && (
                      <>
                        <Button variant="schedule" onClick={() => handleStatusChange(appointment.id, 'scheduled')}>Reschedule</Button>
                        <Button variant="schedule" onClick={() => handleStatusChange(appointment.id, 'pending')}>Uncancel</Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentDashboard;