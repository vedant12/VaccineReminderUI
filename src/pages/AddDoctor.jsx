import { useState } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function AddDoctor() {

    const [formData, setFormData] = useState({
        name: "",
        specialty: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // send to API with axios.post("/appointments", formData)
        api.post("/doctors", formData)
            .then(res => {
                localStorage.setItem('newDoctor', JSON.stringify(res.data));
                navigate('/users'); // Navigate back to appointments list
            })
            .catch(err => console.error("Error adding doctor:", err));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
            <input
                type="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 w-full"
            />

            <input
                name="specialty"
                placeholder="Specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="border p-2 w-full"
            />

            {/* <select
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
            </select> */}

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

export default AddDoctor