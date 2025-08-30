import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddUser() {
    const [roles, setRoles] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        roleId: "",
    });

    const navigate = useNavigate();

    useEffect(() => {

        api.get("/roles") // 👉 update API if you have /doctors endpoint
            .then(res => {
                const roles = res.data;
                setRoles(roles);
            })
            .catch(err => console.error("Error fetching roles:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // send to API with axios.post("/appointments", formData)
        api.post("/users", formData)
            .then(res => {
                localStorage.setItem('newUser', JSON.stringify(res.data));
                navigate('/users'); // Navigate back to appointments list
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

            <textarea
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 w-full"
            />

            <select
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
                className="border p-2 w-full">
                <option value="">-- Select Role --</option>
                {roles.map(role => (
                    <option key={role.id} value={role.id}>
                        {role.roleName}
                    </option>
                ))}
            </select>

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

export default AddUser