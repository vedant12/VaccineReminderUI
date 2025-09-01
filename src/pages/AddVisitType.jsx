import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddVisitType() {

    const [formData, setFormData] = useState({
        name: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // send to API with axios.post("/visittypes", formData)
        api.post("/visittypes", formData)
            .then(res => {
                localStorage.setItem('newVisitType', JSON.stringify(res.data));
                navigate('/visittypes'); // Navigate back to appointments list
            })
            .catch(err => console.error("Error adding appointment:", err));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
            <input
                type="text"
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
    )
}

export default AddVisitType