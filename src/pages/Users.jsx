import { useEffect, useState } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function Appointments() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are deleting user ${user.name}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#30d630ff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/users/?userId=${user.id}`)
                    .then(() => {
                        toast.success("User deleted successfully!");
                        setUsers(users.filter(u => u.id !== user.id));
                    })
                    .catch(err => console.error("Error deleting user:", err));
            }
        });
    }

    useEffect(() => {
        api.get("/users")
            .then(res => setUsers(res.data))
            .finally(() => setLoading(false));

        if (localStorage.getItem('newUser')) {
            toast.success("User added successfully!");
            localStorage.removeItem('newUser');
        }
    }, []);

    return (
        <div className='p-6'>
            <button onClick={() => navigate('/addUser')} className='w-half rounded-lg bg-blue-500 px-3 py-2 text-sm/6 font-bold text-white float-right'>Add User</button>
            <h1 className="text-xl font-bold mb-4">Users</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">RoleId</th>
                            <th className="border p-2">CreatedOn</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="border p-2 text-center">Loading...</td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td className="border p-2">{user.name}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.role.roleName}</td>
                                    <td className="border p-2">{new Date(user.createdOn).toLocaleDateString()}</td>
                                    <td className="border p-2 justify-center flex">
                                        <button
                                            onClick={() => navigate(`/editUser/${user.id}`)}
                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user)}
                                            className="bg-red-500 text-white px-2 py-1 rounded">
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
    )
}

export default Appointments