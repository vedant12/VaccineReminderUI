import { useState } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function AddPatient() {

    const [formData, setFormData] = useState({
        name: ""
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
        api.post("/patients", formData)
            .then(res => {
                localStorage.setItem('newPatient', JSON.stringify(res.data));
                navigate('/users'); // Navigate back to appointments list
            })
            .catch(err => console.error("Error adding patient:", err));
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

export default AddPatient