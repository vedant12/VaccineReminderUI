import { useEffect, useState } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function AddAppointments() {
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        scheduledOn: "",
    });

    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/users") // 👉 update API if you have /doctors endpoint
            .then(res => {
                const doctorsList = res.data.filter(u => u.role?.roleName === "Doctor");
                const patientsList = res.data.filter(u => u.role?.roleName === "Patient");
                setDoctors(doctorsList);
                setPatients(patientsList);
            })
            .catch(err => console.error("Error fetching doctors:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // send to API with axios.post("/appointments", formData)
        api.post("/appointments", formData)
            .then(res => {
                alert("Appointment added successfully!");
                localStorage.setItem('newAppointment', JSON.stringify(res.data));                          
                navigate('/'); // Navigate back to appointments list
            })
            .catch(err => console.error("Error adding appointment:", err));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="border p-2 w-full"
            />

            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 w-full"
            />

            <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="border p-2 w-full">
                <option value="">-- Select Doctor --</option>
                {doctors.map(doc => (
                    <option key={doc.id} value={doc.id}>
                        {doc.name}
                    </option>
                ))}
            </select>

            <select
                name="userId"
                value={formData.patientId}
                onChange={handleChange}
                className="border p-2 w-full">
                <option value="">-- Select Patient --</option>
                {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                        {patient.name}
                    </option>
                ))}
            </select>

            <input
                type="date"
                name="scheduledOn"
                value={formData.scheduledOn}
                onChange={handleChange}
                className="border p-2 w-full"
            />

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Save
            </button>
            <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                onClick={() => window.history.back()}
            >
                Cancel
            </button>
        </form>
    );
}

export default AddAppointments