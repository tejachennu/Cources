import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CrudModal from './CrudModal';

const UserSearch = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://localhost:7253/api/access', {
                    params: { query }
                });
                
                if (response.data && response.data.$values) {
                    setUsers(response.data.$values);
                } else {
                    console.error('API response does not contain $values:', response.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleRoleChange = async () => {
        if (!selectedUser || !selectedUser.userId) {
            console.error('Invalid user object:', selectedUser);
            return;
        }
    
        const updatedRole = selectedUser.role !== "Admin" ? "Admin" : "User";
        const url = `https://localhost:7253/api/Access/Permission?UserId=${selectedUser.userId}&UpdateRole=${updatedRole}`;

        setUpdating(true);
        try {
            const response = await axios.put(url);
            setUsers(users.map(u => (u.userId === selectedUser.userId ? { ...u, role: updatedRole } : u)));
            closeModal();
        } catch (error) {
            console.error("Error updating user role:", error);
        } finally {
            setUpdating(false);
        }
    };

    const openModal = (user) => {
        setSelectedUser(user);
        document.getElementById('roleChangeModal').classList.remove('hidden');
    };

    const closeModal = () => {
        setSelectedUser(null);
        document.getElementById('roleChangeModal').classList.add('hidden');
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                User Name
            </label>
            <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-blue-600">
                <input
                    type="text"
                    id="first_name"
                    placeholder="Search users"
                    onChange={handleInputChange}
                    required
                    className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none"
                />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="mt-4">
                    {users.length === 0 ? (
                        <p>No Users are available</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-500">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Role</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.userId} className="bg-white border-b">
                                            <td className="px-6 py-4">{user.name}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.role}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    className="text-blue-600 cursor-pointer hover:text-blue-900"
                                                    onClick={() => openModal(user)}
                                                >
                                                    {user.role !== "Admin" ? "Make As Admin" : "Make As User"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Modal for Role Change Confirmation */}
            <div id="roleChangeModal" tabIndex="-1" className="fixed inset-0 z-50 flex items-center justify-center hidden bg-black bg-opacity-50">
                <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-md">
                    <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" onClick={closeModal}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 text-center md:p-5">
                        <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to change the role of {selectedUser?.name} to {selectedUser?.role !== "Admin" ? "Admin" : "User"}?</h3>
                        {updating ? (
                            <div className="flex items-center justify-center">
                                <div className="w-8 h-8 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader"></div>
                            </div>
                        ) : (
                            <>
                                <button onClick={handleRoleChange} type="button" className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={closeModal} type="button" className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">No, cancel</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default UserSearch;
