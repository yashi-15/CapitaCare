import React, { useEffect, useState } from "react";
import { FaArrowRight, FaFilter } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiDownload } from "react-icons/fi";
import { LuPlug, LuPlus } from "react-icons/lu";
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import AddTransactionPopUp from "../../components/AddTransactionPopUp";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Loader from "../../components/Loader";
import TransactionItem from "../../components/TransactionItem";

const Transactions = () => {
    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const [transactions, setTransactions] = useState([]);
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

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(API_PATHS.TRANSACTION.FETCH + `?month=${selectedMonth}&year=${selectedYear}`);
            if (response.status == 200) {
                setTransactions(response.data.data);
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

    const [selectedType, setSelectedType]= useState('all')
    const [filteredTransactions, setFilteredTransactions]= useState(transactions)

    useEffect(()=>{
        if(selectedType === "all"){
            setFilteredTransactions(transactions)
        }
        else{
            setFilteredTransactions(transactions.filter((transac)=> transac.type === selectedType))
        }
    }, [selectedType, transactions])


    if (loading) {
        return <Loader />;
    }

    return (
        <div className="py-3">
            <div className="bg-white p-3 rounded-md shadow-md my-3">
                <div className="p-3 lg:p-4">
                    <h2 className="text-xs md:text-sm lg:text-base font-semibold">All Transactions Overview</h2>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <AreaChart style={{ width: "960%", height: "100%", maxHeight: "35vh", aspectRatio: 1.618 }} responsive data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#A664FF" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#A664FF" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F37335" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#F37335" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tickLine={false} axisLine={false} style={{ fontSize: "12px" }} />
                        <YAxis width="auto" tickLine={false} axisLine={false} style={{ fontSize: "12px" }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="pv" stroke="#A664FF" strokeWidth={3} fill="url(#colorPv)" activeDot={{ r: 8 }} dot={{ fill: "#A664FF" }} />
                        <Area type="monotone" dataKey="uv" stroke="#F37335" strokeWidth={3} fill="url(#colorUv)" activeDot={{ r: 8 }} dot={{ fill: "#A664FF" }} />
                    </AreaChart>
                </div>
            </div>
            <div className="rounded-md p-3 bg-white shadow-md my-3">
                <div className="p-3 lg:p-4 flex justify-between">
                    <h2 className="text-xs md:text-sm lg:text-base font-semibold">All Transactions</h2>
                    <button className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-[9px] md:text-xs hover:bg-primary/15 hover:text-primary font-medium">
                        <FiDownload /> Download
                    </button>
                </div>
                <div className="p-4 flex justify-between gap-4">
                    <div className="flex gap-2 items-center">
                        <FaFilter />
                        <select className="bg-accent p-1" value={selectedType} onChange={(e)=> setSelectedType(e.target.value)}>
                            <option value={"all"}>All</option>
                            <option value={"income"}>Income</option>
                            <option value={"expense"}>Expense</option>
                        </select>
                    </div>
                    <div className="flex gap-4">
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
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2">{filteredTransactions.length > 0 ? filteredTransactions.map((transac) => <TransactionItem transaction={transac} />) : <p>No transactions</p>}</div>
            </div>
        </div>
    );
};

export default Transactions;
