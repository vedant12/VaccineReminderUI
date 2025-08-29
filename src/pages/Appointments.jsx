import { useEffect, useState } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
function Appointments() {
    
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        api.get("/appointments").then(res => setAppointments(res.data));
        localStorage.setItem('test', 'test');
        if (localStorage.getItem('newAppointment')) {
            setAlert(true);
            localStorage.removeItem('newAppointment');
        }
    }, []);

    return (
        <>
            {alert && (
                <Alert
                    title="Success!"
                    message="Appointment added successfully!"
                    onClose={() => setAlert(false)}
                />
            )}
            <div className='p-6'>
                <button
                    onClick={() => navigate("/addappointment")}
                    className='w-half rounded-lg bg-blue-500 px-3 py-2 text-sm/6 font-bold text-white float-right'
                >
                    Add Appointment
                </button>
                <h1 className="text-xl font-bold mb-4">Appointments</h1>
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Scheduled On</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Patient</th>
                            <th className="border p-2">Doctor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => (
                            <tr key={appointment.id}>
                                <td className="border p-2">{appointment.title}</td>
                                <td className="border p-2">{appointment.description}</td>
                                <td className="border p-2">{new Date(appointment.scheduledOn).toLocaleDateString()}</td>
                                <td className="border p-2">{appointment.statusId == 1 ? "Scheduled" : appointment.statusId == 2 ? "Completed" : "Cancelled"}</td>
                                <td className="border p-2">{appointment?.patient?.name}</td>
                                <td className="border p-2">{appointment?.doctor?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Appointments