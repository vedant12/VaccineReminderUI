import React from 'react';
import { useNavigate } from 'react-router-dom';
function PatientsDatatable({ data }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto">
      <button
        onClick={() => navigate('/addPatient')}
        className='w-half mb-5 rounded-lg bg-blue-500 px-3 py-2 text-sm/6 font-bold text-white float-right'>
        Add Patient
      </button>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Created On</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((patient) => (
              <tr key={patient.id}>
                <td className="border text-center p-2">{patient.name}</td>
                <td className="border text-center p-2">
                  {new Date(patient.createdOn).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-2 text-center">
                No doctors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsDatatable;
