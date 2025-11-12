import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { LuPlug, LuPlus } from "react-icons/lu";
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import AddTransactionPopUp from "../../components/AddTransactionPopUp";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Loader from "../../components/Loader";

const Expense = () => {

    const { user } = useContext(UserContext);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddExpense = async (emoji, category, amount, date, note) => {
        const data = {
            user: user.id,
            type: "expense",
            emoji,
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
            const response = await axiosInstance.get(API_PATHS.TRANSACTION.FETCH);
            if (response.status == 200) {
                const data = response.data.filter((item) => item.type === "expense");
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
    }, []);

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
                    <div className="grid grid-cols-2">
                        {expense.length > 0 ? (
                            expense.map((exp) => (
                                <div key={exp.id} className="my-2 px-5 py-3 flex items-center gap-3 hover:bg-accent">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center flex justify-center items-center">{<img src={exp.emoji || "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b0.png"} width={24} /> }</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">{exp.category}</h4>
                                        <p className="text-xs text-gray-500">{new Date(exp.date).toLocaleString()}</p>
                                    </div>
                                    <div className={`text-xs ${exp.type === "income" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"} px-2 rounded-full`}>
                                        {exp.type === "income" ? <span>+</span> : <span>-</span>} {exp.amount}
                                    </div>
                                </div>
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
