import { useEffect, useState } from 'react'
import api from '../api/axios';

function Appointments() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.get("/users").then(res => setUsers(res.data)).finally(() => setLoading(false));
    }, []);

    return (
        <div className='p-6'>
            <button className='w-half rounded-lg bg-blue-500 px-3 py-2 text-sm/6 font-bold text-white float-right'>Add User</button>
            <h1 className="text-xl font-bold mb-4">Users</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">RoleId</th>
                            <th className="border p-2">CreatedOn</th>
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