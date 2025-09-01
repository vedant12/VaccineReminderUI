import { useEffect, useState } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

function VisitTypes() {

    const navigate = useNavigate();
    const [visitTypes, setVisitTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = (visitType) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You are deleting Visit Type ${visitType.name}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#30d630ff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/visittypes/${visitType.id}`)
                    .then(() => {
                        toast.success("Visit Type deleted successfully!");
                        setVisitTypes(visitTypes.filter(u => u.id !== visitType.id));
                    })
                    .catch(err => console.error("Error deleting user:", err));
            }
        });
    }

    useEffect(() => {
        api.get("/visittypes")
            .then(res => setVisitTypes(res.data))
            .finally(() => setLoading(false));

        if (localStorage.getItem('newVisitType')) {
            toast.success("Visit Type added successfully!");
            localStorage.removeItem('newVisitType');
        }
    }, []);

    return (
        <>
            <div className='p-6'>
                <button
                    onClick={() => navigate("/addvisittypes")}
                    className='w-half rounded-lg bg-blue-500 px-3 py-2 text-sm/6 font-bold text-white float-right'
                >
                    Add Visit Type
                </button>
                <h1 className="text-xl font-bold mb-4">Visit Types</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="2" className="border p-2 text-center">Loading...</td>
                                </tr>
                            ) : visitTypes.length == 0 ? (
                                <tr>
                                    <td colSpan="2" className="border p-2 text-center">No Data Found</td>
                                </tr>
                            ) : (
                                visitTypes.map(visitType => (
                                    <tr key={visitType.id}>
                                        <td className="border p-2">{visitType.name}</td>
                                        <td className="border p-2 justify-center flex">
                                            <button
                                                onClick={() => navigate(`/editVisitType/${visitType.id}`)}
                                                className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(visitType)}
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
        </>
    )
}

export default VisitTypes