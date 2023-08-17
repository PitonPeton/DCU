import axios from "axios";
import { useEffect, useState } from "react";


export default function Students() {
    const [studentsData, setStudentsData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for "Add Student" modal
    const [newStudentData, setNewStudentData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        id_number: "",
        tel: "",
        address: "",
    });

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:4000/students");
            setStudentsData(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const openModal = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setIsModalOpen(false);
        setIsAddModalOpen(false);
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/students", newStudentData);
            fetchStudents();
            closeModal();
            setNewStudentData({
                id_number: "",
                first_name: "",
                last_name: "",
                email: "",
                address: "",
                tel: "",
            });
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/students/${id}`);
            closeModal();
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    function formatDate(date) {
        const isoDate = new Date(date);

        const year = isoDate.getFullYear();
        const month = String(isoDate.getMonth() + 1).padStart(2, "0");
        const day = String(isoDate.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    return (
        <section className="flex flex-col justify-center antialiased text-gray-600 dark:text-white w-full pr-5 mb-8">
            <div className="flex mb-4 justify-center flex-wrap text-white">
        <div className="w-full sm:w-1/3 pr-3 pb-4">
            <div className="flex flex-col gap-2 w-full rounded-md bg-gradient-to-r from-purple-500 to-blue-500 p-5">
                <span className="text-xs">Total Students</span>
                <span className="font-bold text-sm md:text-xl">{studentsData.length}</span>
            </div>
        </div>
        <div className="w-full sm:w-1/3 pr-3 pb-4">
            <div className="flex flex-col gap-2 w-full rounded-md bg-gradient-to-r from-red-500 to-orange-500 p-5">
                <span className="text-xs">Total Income</span>
                <span className="font-bold text-sm md:text-xl">RD${eval(studentsData.length*1500.00)}</span>
            </div>
        </div>
        <div className="w-full sm:w-1/3 pb-4">
            <div className="flex flex-col gap-2 w-full rounded-md bg-gradient-to-r from-green-500 to-cyan-500 p-5">
                <span className="text-xs">Total sections</span>
                <span className="font-bold text-sm md:text-xl">10</span>
            </div>
        </div>

    </div>
            <div className="w-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border dark:border-gray-600 border-gray-400">
                <header className="flex justify-between px-5 py-4 border-b dark:border-gray-600 border-gray-400">
                    <h2 className="font-semibold">Students</h2>
                    <button id="addStudent" onClick={openAddModal} className="font-semibold text-white  bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md">+</button>
                </header>
                {isAddModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-30 bg-opacity-50 bg-gray-900">
                        {/* Modal content */}
                        {/* Form for adding a new student */}
                        <div className="bg-white flex flex-col gap-2 dark:bg-slate-800 p-6 rounded-md shadow-lg w-11/12 md:w-96">
                            <div className="flex justify-between items-center dark:text-white text-gray-900 border-b border-gray-500 pb-2">
                                <h3 className="text-lg font-bold">Add New Student</h3>
                                <button
                                    className="p-3 px-5 dark:hover:bg-slate-700 hover:bg-gray-200 rounded-md transition-all"
                                    onClick={closeModal}
                                >
                                    x
                                </button>
                            </div>
                            <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                <label htmlFor="First Name">First Name</label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="First Name"
                                    value={newStudentData.first_name}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, first_name: e.target.value })}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label htmlFor="Last Name">Last Name</label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Last Name"
                                    value={newStudentData.last_name}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, last_name: e.target.value })}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label htmlFor="email">Email</label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="email"
                                    placeholder="email"
                                    value={newStudentData.email}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, email: e.target.value })}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label htmlFor="Identification number">Identification number</label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Identification number"
                                    value={newStudentData.id_number}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, id_number: e.target.value })}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label htmlFor="phone number">Phone Number</label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="phone number"
                                    value={newStudentData.tel}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, tel: e.target.value })}
                                />
                                </div>
                                <div className="flex flex-col">
                                <label htmlFor="Address">Address</label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="address"
                                    value={newStudentData.address}
                                    onChange={(e) => setNewStudentData({ ...newStudentData, address: e.target.value })}
                                />
                                </div>

                                <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 mt-3">
                                    Add Student
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {isModalOpen && selectedStudent && (
                    <div className="fixed inset-0 flex items-center justify-center z-30 bg-opacity-50 bg-gray-900">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            {/* Background overlay */}
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            {/* Modal content */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                            <div className="p-5 inline-block align-bottom bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                {/* Modal content */}
                                <div className="flex justify-between items-center border-b pb-2 border-gray-400">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Student Details
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="hover:bg-gray-200 dark:hover:bg-slate-700 rounded-md p-3 px-5"
                                    >
                                        x
                                    </button>
                                </div>
                                <div className="my-4 flex flex-col gap-2 text-gray-600 dark:text-gray-300">
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">ID:</strong> {selectedStudent.id}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">First Name:</strong> {selectedStudent.first_name}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">Last Name:</strong>  {selectedStudent.last_name}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">Email:</strong> {selectedStudent.email}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">ID Number:</strong> {selectedStudent.id_number}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">Phone Number:</strong> {selectedStudent.tel}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">Address:</strong> {selectedStudent.address}
                                    </p>
                                    <p className="">
                                        <strong className="dark:text-white text-gray-900">Creation date:</strong> {formatDate(selectedStudent.createAt)}
                                    </p>
                                </div>
                                {/* Modal buttons */}
                                <div>
                                    <button
                                        onClick={() => handleDeleteStudent(selectedStudent.id)}
                                        className="bg-red-500 hover:bg-red-600 rounded-md p-3"
                                    >
                                        Delete Student
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-slate-700 even:border-gray-200 dark:even:border-gray-500 dark:even:text-white even:text-gray-500">
                            <th className="px-6 py-3 border-b  text-left text-xs leading-4 font-medium  uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                ID Number
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                Phone Number
                            </th>
                            <th className="px-6 py-3 border-b text-center text-xs leading-4 font-medium uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-700 ">
                        {studentsData != [] ? studentsData.map((student) => (
                            <tr key={student.id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="flex items-center">
                                        <div className="">
                                            <div className="text-sm leading-5 font-medium text-gray-900 dark:text-white">{student.first_name} {student.last_name}</div>
                                            <div className="text-sm leading-5 text-gray-500">{student.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b ">
                                    <span className="text-sm leading-5 text-gray-900 dark:text-gray-200">{student.id_number}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    <span className="text-sm leading-5 text-gray-900 dark:text-white">{student.tel}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-center border-b text-sm leading-5 font-medium">
                                    <button onClick={() => openModal(student)} className="text-green-500 hover:text-green-600 focus:outline-none focus:underline">Show</button>
                                </td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
