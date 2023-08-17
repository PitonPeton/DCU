import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Loans() {
    const [loansData, setLoansData] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [clientsData, setCliensData] = useState(false);
    const [selectedClientData, setSelectedClientData] = useState(null);
    const [newLoanData, setNewLoanData] = useState({
        requirement_date: "",
        id_number: "",
        required_amount: '',
        cuotes_quantity: '',
        cuotes_amount: '',
        monthly_interest: '',
    });

    const fetchLoans = async () => {
        try {
            const response = await axios.get("http://localhost:4000/loans");
            setLoansData(response.data);
        } catch (error) {
            console.error("Error fetching loans:", error);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchClient = async () => {
        try {
            const response = await axios.get("http://localhost:4000/clients");
            setCliensData(response.data);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    useEffect(() => {
        fetchClient();
    }, []);

    const openModal = (loan) => {
        setSelectedLoan(loan);
        clientsData.forEach(e => (
            e.id_number === loan.client_id_number ? setSelectedClientData(e) : null
        ))
        setIsModalOpen(true);
    }

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeModal = () => {
        setSelectedLoan(null);
        setIsModalOpen(false);
        setIsAddModalOpen(false);
    };

    const handleAddLoan = async (e) => {
        e.preventDefault();
        console.log(newLoanData);

        try {
            const requiredAmount = parseFloat(newLoanData.required_amount);
            const cuotesQuantity = parseInt(newLoanData.cuotes_quantity);
            const monthlyInterest = parseFloat(newLoanData.monthly_interest);

            const cuotesAmount = (requiredAmount / cuotesQuantity) * (1 + (monthlyInterest / 100));

            await axios.post("http://localhost:4000/loans", {
                ...newLoanData,
                cuotes_amount: cuotesAmount
            });

            fetchLoans();
            closeModal();
            setNewLoanData({
                requirement_date: "",
                id_number: "",
                required_amount: '',
                cuotes_quantity: '',
                cuotes_amount: '',
                monthly_interest: '',
            });
        } catch (error) {
            console.error("Error adding loan:", error);
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
            <div className="w-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-gray-200">
                <header className="flex justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold">Loans</h2>
                    <button id="addLoan" onClick={openAddModal} className="font-semibold text-white  bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md">+</button>
                </header>
                {isAddModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-30 bg-opacity-50 bg-gray-900">
                        {/* Modal content */}
                        {/* Form for adding a new loan */}
                        <div className="bg-white p-6 rounded-md shadow-lg">
                            <h3 className="text-lg font-medium mb-4">Add New Loan</h3>
                            <form id="createNewLoan" onSubmit={handleAddLoan} className="flex flex-col gap-4">
                                <select
                                    value={newLoanData.id_number}
                                    onChange={(e) => setNewLoanData({ ...newLoanData, id_number: e.target.value })}
                                >
                                    <option value="" disabled>Select a client Id number</option>
                                    {clientsData.map((client) => (
                                        <option key={client.id_number} value={client.id_number}>
                                            {client.id_number}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="date"
                                    placeholder="Requirement Date"
                                    value={newLoanData.requirement_date}
                                    onChange={(e) => setNewLoanData({ ...newLoanData, requirement_date: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={newLoanData.required_amount}
                                    onChange={(e) => setNewLoanData({ ...newLoanData, required_amount: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Cuotes quantity"
                                    value={newLoanData.cuotes_quantity}
                                    onChange={(e) => setNewLoanData({ ...newLoanData, cuotes_quantity: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Monthly interest"
                                    value={newLoanData.monthly_interest}
                                    onChange={(e) => setNewLoanData({ ...newLoanData, monthly_interest: e.target.value })}
                                />
                                <p className="bg-green-300">{newLoanData.cuotes_amount}</p>
                                <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 mt-3">
                                    Add Loan
                                </button>
                            </form>
                            <button
                                className="text-gray-500 mt-2"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                User ID Number
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Total Amount
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Cuotes Amount
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Payment Date
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {loansData != [] ? loansData.map((loan, i) => (
                            <tr key={loan.id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span className="text-sm leading-5 text-gray-900">{loan.client_id_number}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    <span className="text-sm leading-5 text-gray-900">RD${loan.required_amount}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    <span className="text-sm leading-5 text-gray-900">RD${loan.cuotes_amount}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                                    <span className="text-sm leading-5 text-gray-900">{formatDate(loan.requirement_date)}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap text-center border-b border-gray-200 text-sm leading-5 font-medium">
                                    <button onClick={() => openModal(loan)} className="text-green-600 hover:text-green-900 focus:outline-none focus:underline">Show</button>
                                </td>
                            </tr>
                        )) : null}
                    </tbody>

                </table>
                {isModalOpen && selectedLoan && (
                    <div className="fixed inset-0 flex items-center justify-center z-30 bg-opacity-50 bg-gray-900">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            {/* Background overlay */}
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            {/* Modal content */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                {/* Modal content */}
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                Loan Details
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm leading-5 text-gray-500">
                                                    Client Name: {selectedClientData.first_name} {selectedClientData.last_name}
                                                </p>
                                                <p className="text-sm leading-5 text-gray-500">
                                                    Client Id Number: {selectedLoan.client_id_number}
                                                </p>
                                                <p className="text-sm leading-5 text-gray-500">
                                                    Amount  RD${selectedLoan.required_amount}
                                                </p>
                                                <p className="text-sm leading-5 text-gray-500">
                                                    Cuotes: {selectedLoan.cuotes_quantity}
                                                </p>
                                                <p className="text-sm leading-5 text-gray-500">
                                                    Montly Payment: RD${selectedLoan.cuotes_amount}
                                                </p>
                                                <p className="text-sm leading-5 text-gray-500">
                                                    Montly Interest: {selectedLoan.monthly_interest}%
                                                </p>
                                                <p className="text-sm leading-5 text-gray-500">
                                                    Payment Date: {formatDate(selectedLoan.requirement_date)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Modal buttons */}
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                        >
                                            Close
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}