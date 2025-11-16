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
import showToast from "../../utils/showToast";

const TransactionPage = ({ type }) => {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
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

    const handleAddTransaction = async (emoji, category, amount, date, note) => {
        const data = {
            user: user.id,
            type: type,
            emoji: emoji || "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b0.png",
            category,
            amount,
            date,
            note,
        };
        try {
            const response = await axiosInstance.post(API_PATHS.TRANSACTION.ADD, data);
            if (response.status == 200) {
                showToast(true, "Transaction added");
            }
        } catch (error) {
            showToast(false, error);
        } finally {
            setAddModalOpen(false);
        }
    };

    const handleDownload = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(API_PATHS.TRANSACTION.DOWNLOAD + `?month=${selectedMonth}&year=${selectedYear}&type=${type}`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${type}_details_${selectedMonth}_${selectedYear}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            alert(err);
        }
    };

    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState([]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(API_PATHS.TRANSACTION.FETCH + `?month=${selectedMonth}&year=${selectedYear}`);
            if (response.status == 200) {
                const data = response.data.data.filter((item) => item.type === type);
                setTransactions(response.data.data.filter((item) => item.type === type));
                const chartDataArray = [];
                data.forEach((transaction) => {
                    const existingIndex = chartDataArray.findIndex((item) => item.category.toLowerCase().trim() === transaction.category.toLowerCase().trim());
                    if (existingIndex !== -1) {
                        chartDataArray[existingIndex].amount += transaction.amount;
                    } else {
                        chartDataArray.push({ ...transaction });
                    }
                });
                setChartData(chartDataArray);
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            alert(err);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [selectedMonth, selectedYear]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="py-3">
            <div className="bg-white p-3 rounded-md shadow-md my-3">
                <div className="p-3 lg:p-4 flex justify-between">
                    <h2 className="text-xs md:text-sm lg:text-base font-semibold">{capitalizedType} Overview</h2>
                    <button onClick={() => setAddModalOpen(true)} className="flex items-center gap-2 rounded-sm px-2 py-1 text-[9px] md:text-xs text-sm bg-primary/15 text-primary hover:scale-96 font-medium">
                        <LuPlus /> Add {capitalizedType}
                    </button>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <AreaChart style={{ width: "960%", height: "100%", maxHeight: "35vh", aspectRatio: 1.618 }} responsive data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
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
                <div className="p-3 lg:p-4 flex justify-between">
                    <h2 className="text-xs md:text-sm lg:text-base font-semibold">{capitalizedType} Sources</h2>
                    <button onClick={handleDownload} className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-[9px] md:text-xs hover:bg-primary/15 hover:text-primary font-medium">
                        <FiDownload /> Download
                    </button>
                </div>
                <div className="p-4 flex justify-end gap-4">
                    <div className="flex justify-center gap-2">
                        <button onClick={() => updateMonth("sub")} className="flex items-center gap-2 bg-accent rounded-sm px-1 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium">
                            <FiArrowLeft />
                        </button>
                        <h2 className="text-[9px] sm:text-xs md:text-sm lg:text-base font-semibold w-12 sm:w-18 lg:w-22 text-center">{monthNames[selectedMonth]}</h2>
                        <button
                            onClick={() => updateMonth("add")}
                            className={`${selectedYear === currentDate.getFullYear() && selectedMonth === currentDate.getMonth() + 1 ? "invisible" : ""} flex items-center gap-2 bg-accent rounded-sm px-1 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium`}
                        >
                            <FiArrowRight />
                        </button>
                    </div>
                    <div className="flex justify-center gap-2">
                        <button onClick={() => updateYear("sub")} className="flex items-center gap-2 bg-accent rounded-sm px-1 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium">
                            <FiArrowLeft />
                        </button>
                        <h2 className="text-[9px] sm:text-xs md:text-sm lg:text-base font-semibold sm:w-8 lg:w-10 text-center">{selectedYear}</h2>
                        <button onClick={() => updateYear("add")} className={`${selectedYear === currentDate.getFullYear() ? "invisible" : ""} flex items-center gap-2 bg-accent rounded-sm px-1 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium`}>
                            <FiArrowRight />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">{transactions.length > 0 ? transactions.map((transac) => <TransactionItem transaction={transac} />) : <p>No {capitalizedType}</p>}</div>
            </div>
            {addModalOpen && <AddTransactionPopUp type={capitalizedType} closePopup={() => setAddModalOpen(false)} submit={handleAddTransaction} />}
        </div>
    );
};

export default TransactionPage;
