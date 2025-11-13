import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiDownload } from "react-icons/fi";
import { LuPlug, LuPlus } from "react-icons/lu";
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import AddTransactionPopUp from "../../components/AddTransactionPopUp";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Loader from "../../components/Loader";
import TransactionItem from "../../components/TransactionItem";

const Expense = () => {

    const { user } = useContext(UserContext);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
        const currentDate = new Date();
        const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
        const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    
        const monthNames = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "Spetember",
            10: "October",
            11: "November",
            12: "December",
        };
    
        const updateMonth = (type) => {
            const date = new Date(selectedYear, selectedMonth - 1);
            date.setMonth(date.getMonth() + (type === "sub" ? -1 : 1));
            setSelectedYear(date.getFullYear());
            setSelectedMonth(date.getMonth() + 1);
        };
        const updateYear = (type) => {
            setSelectedYear((prev) => prev + (type === "sub" ? -1 : 1));
        };

    const handleAddExpense = async (emoji, category, amount, date, note) => {
        const data = {
            user: user.id,
            type: "expense",
            emoji: emoji || "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b0.png" ,
            category,
            amount,
            date,
            note,
        };
        try {
            const response = await axiosInstance.post(API_PATHS.TRANSACTION.ADD, data);
            if (response.status == 200) {
                alert("yayyy");
            }
        } catch (error) {
            alert(error);
        } finally {
            setAddModalOpen(false);
        }
    };

    const [expense, setExpense] = useState([]);

    const fetchExpense = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(API_PATHS.TRANSACTION.FETCH + `?month=${selectedMonth}&year=${selectedYear}`);
            if (response.status == 200) {
                const data = response.data.data.filter((item) => item.type === "expense");
                setExpense(data);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            alert(err);
        }
    };

    useEffect(() => {
        fetchExpense();
    }, [selectedMonth, selectedYear]);

    if (loading) {
            return(
                <Loader />
            )
        }

    return (
        <div className="py-3">
            <div className="bg-white p-3 rounded-md shadow-md my-3">
                <div className="p-4 flex justify-between">
                    <h2 className="font-semibold">Expense Overview</h2>
                    <button onClick={() => setAddModalOpen(true)} className="flex items-center gap-2 rounded-sm px-2 py-1 text-sm bg-primary/15 text-primary hover:scale-96 font-medium">
                        <LuPlus /> Add Expense
                    </button>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <AreaChart style={{ width: "960%", height: "100%", maxHeight: "35vh", aspectRatio: 1.618 }} responsive data={expense} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#A664FF" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#A664FF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="category" tickLine={false} axisLine={false} style={{ fontSize: "12px" }} />
                        <YAxis width="auto" tickLine={false} axisLine={false} style={{ fontSize: "12px" }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="amount" stroke="#A664FF" strokeWidth={3} fill="url(#colorPv)" activeDot={{ r: 8 }} dot={{ fill: "#A664FF" }} />
                    </AreaChart>
                </div>
            </div>
            <div className="rounded-md p-3 bg-white shadow-md my-3">
                <div className="p-4 flex justify-between">
                    <h2 className="font-semibold">All Expenses</h2>
                    <button className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium">
                        <FiDownload /> Download
                    </button>
                </div>
                <div className="p-4 flex justify-end gap-4">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => updateMonth("sub")} className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium">
                                            <FiArrowLeft />
                                        </button>
                                        <h2 className="font-semibold w-22 text-center">{monthNames[selectedMonth]}</h2>
                                        <button
                                            onClick={() => updateMonth("add")}
                                            className={`${selectedYear === currentDate.getFullYear() && selectedMonth === currentDate.getMonth() + 1 ? "invisible" : ""} flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium`}
                                        >
                                            <FiArrowRight />
                                        </button>
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => updateYear("sub")} className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium">
                                            <FiArrowLeft />
                                        </button>
                                        <h2 className="font-semibold w-10 text-center">{selectedYear}</h2>
                                        <button onClick={() => updateYear("add")} className={`${selectedYear === currentDate.getFullYear() ? "invisible" : ""} flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium`}>
                                            <FiArrowRight />
                                        </button>
                                    </div>
                                </div>
                    <div className="grid grid-cols-2">
                        {expense.length > 0 ? (
                            expense.map((exp) => (
                                <TransactionItem transaction={exp} />
                            ))
                        ) : (
                            <p>No Expense</p>
                        )}
                    </div>
            </div>
            {addModalOpen && <AddTransactionPopUp type="Expense" closePopup={() => setAddModalOpen(false)} submit={handleAddExpense} />}
        </div>
    );
};

export default Expense;
