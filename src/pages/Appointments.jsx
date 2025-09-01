import { useEffect, useState } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function Appointments() {

    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleDelete = (appointment) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are deleting appointment ${appointment.title} for patient ${appointment?.patient?.name}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#30d630ff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/appointments/${appointment.id}`)
                    .then(() => {
                        toast.success("Appointment deleted successfully!");
                        setAppointments(appointments.filter(u => u.id !== appointment.id));
                    })
                    .catch(err => console.error("Error deleting user:", err));
            }
        });
    }

    useEffect(() => {
        api.get("/appointments")
            .then(res => setAppointments(res.data))
            .finally(() => setLoading(false))
            .catch(err => console.error("Error fetching appointments:", err));

        console.log(appointments)
        
        if (localStorage.getItem('newAppointment')) {
            setAlert(true);
            toast.success("Appointment added successfully!");
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
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Scheduled On</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Patient</th>
                                <th className="border p-2">Doctor</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="border p-2 text-center">Loading...</td>
                                </tr>
                            ) : appointments.length == 0 ? (
                                <tr>
                                    <td colSpan="7" className="border p-2 text-center">No Data Found</td>
                                </tr>
                            ) : (
                                appointments.map(appointment => (
                                    <tr key={appointment.id}>
                                        <td className="border p-2">{appointment.title}</td>
                                        <td className="border p-2">{appointment.description}</td>
                                        <td className="border p-2">{new Date(appointment.scheduledOn).toLocaleDateString()}</td>
                                        <td className="border p-2">{appointment.statusId == 1 ? "Scheduled" : appointment.statusId == 2 ? "Completed" : "Cancelled"}</td>
                                        <td className="border p-2">{appointment?.patient?.name}</td>
                                        <td className="border p-2">{appointment?.doctor?.name}</td>
                                        <td className="border p-2 text-center">
                                            <button
                                                onClick={() => navigate(`/editUser/${appointment.id}`)}
                                                className="bg-green-500 text-white px-2 py-1 rounded m-2">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(appointment)}
                                                className="bg-red-500 text-white px-2 py-1 m-2 rounded">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Appointments