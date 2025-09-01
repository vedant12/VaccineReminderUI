import { useEffect, useState } from 'react'
import api from '../api/axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import DoctorsDatatable from '../components/DoctorsDatatable';
import UsersDatatable from '../components/UsersDatatable';
import PatientsDatatable from '../components/PatientsDatatable';

function Appointments() {
    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setChecked] = useState("users");

    // const handleDelete = (user) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: `You are deleting user ${user.name}!`,
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#30d630ff",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             api.delete(`/users/?userId=${user.id}`)
    //                 .then(() => {
    //                     toast.success("User deleted successfully!");
    //                     setUsers(users.filter(u => u.id !== user.id));
    //                 })
    //                 .catch(err => console.error("Error deleting user:", err));
    //         }
    //     });
    // }

    const checkRadio = (value) => {
        setChecked(value);
    }

    const fetchUsers = () => {
        api.get("/users")
            .then(res => setUsers(res.data))
            .finally(() => setLoading(false));
    }

    const fetchDoctors = () => {
        api.get("/doctors")
            .then(res => setDoctors(res.data))
            .finally(() => setLoading(false));
    }

    const fetchPatients = () => {
        api.get("/patients")
            .then(res => setPatients(res.data))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchUsers();

        fetchDoctors();

        fetchPatients();

        if (localStorage.getItem('newUser')) {
            toast.success("User added successfully!");
            localStorage.removeItem('newUser');
        }

    }, []);

    return (
        <div className='p-6'>            
            <h1 className="text-xl font-bold mb-4">Users</h1>
            <div className="flex gap-6 m-5">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="type"
                        value="patients"
                        onChange={() => checkRadio("patients")}
                    />
                    Patients
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="type"
                        value="doctors"
                        onChange={() => checkRadio("doctors")}
                    />
                    Doctors
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="type"
                        value="users"
                        onChange={() => checkRadio("users")}
                    />
                    Users
                </label>
            </div>

            {loading ? (
                <p className="text-center p-4">Loading...</p>
            ) : value === "doctors" ? (
                <DoctorsDatatable data={doctors} />
            ) : value === "patients" ? (
                <PatientsDatatable data={patients} />
            ) : value === "users" ? (
                <UsersDatatable data={users} />
            ) : (
                <></>
            )}
        </div >
    )
}

export default Appointments