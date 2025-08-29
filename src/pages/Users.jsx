import { useEffect, useState } from 'react'
import api from '../api/axios';

function Appointments() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/users").then(res => setUsers(res.data));
    }, []);

    return (
        <div className='p-6'>
            <button className='w-half rounded-lg bg-blue-500 px-3 py-2 text-sm/6 font-bold text-white float-right'>Add User</button>
            <h1 className="text-xl font-bold mb-4">Users</h1>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">RoleId</th>
                        <th className="border p-2">CreatedOn</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.role.roleName}</td>
                            <td className="border p-2">{new Date(user.createdOn).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Appointments