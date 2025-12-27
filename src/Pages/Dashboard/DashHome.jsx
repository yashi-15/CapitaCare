import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { IoWalletSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Bar, BarChart, Label, LabelList, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Loader from "../../components/Loader";
import TransactionItem from "../../components/TransactionItem";

const DashHome = () => {
    const [loading, setLoading] = useState(false);
    const [dashData, setDashData] = useState({});

    const fetchDashData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(API_PATHS.DASHBOARD);
            setDashData(response.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            alert(err);
        }
    };

    useEffect(() => {
        fetchDashData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="py-1 sm:py-3">
            <div className="grid grid-cols-3 gap-3 my-3">
                <div className="bg-white p-3 rounded-md shadow-md flex items-center gap-3">
                    <div className="hidden md:block p-3 bg-primary/15 text-primary rounded-full">
                        <IoWalletSharp className="w-7 h-7 lg:w-10 lg:h-10" />
                    </div>
                    <div>
                        <h2 className="text-[8px] sm:text-xs md:text-sm lg:text-base text-gray-600 ">Balance</h2>
                        <h3 className="text-[10px] sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-semibold">Rs. {dashData.totalBalance}</h3>
                    </div>
                </div>
                <div className="bg-white p-3 rounded-md shadow-md flex items-center gap-3">
                    <div className="hidden md:block p-3 bg-primary/15 text-primary rounded-full">
                        <GiReceiveMoney className="w-7 h-7 lg:w-10 lg:h-10" />
                    </div>
                    <div>
                        <h2 className="text-[8px] sm:text-xs md:text-sm lg:text-base text-gray-600 ">Income</h2>
                        <h3 className="text-[10px] sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-semibold">Rs. {dashData.totalIncome}</h3>
                    </div>
                </div>
                <div className="bg-white p-3 rounded-md shadow-md flex items-center gap-3">
                    <div className="hidden md:block p-3 bg-primary/15 text-primary rounded-full">
                        <GiPayMoney className="w-7 h-7 lg:w-10 lg:h-10" />
                    </div>
                    <div>
                        <h2 className="text-[8px] sm:text-xs md:text-sm lg:text-base text-gray-600 ">Expense</h2>
                        <h3 className="text-[10px] sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-semibold">Rs. {dashData.totalExpense}</h3>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                <div className="rounded-md bg-white shadow-md">
                    <div className="p-3 lg:p-4 flex justify-between">
                        <h2 className="text-xs md:text-sm lg:text-base font-semibold">Recent Transactions</h2>
                        <Link to={"/dashboard/transactions"} className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-[9px] md:text-xs hover:bg-primary/15 hover:text-primary font-medium">
                            See All <FaArrowRight />{" "}
                        </Link>
                    </div>
                    <div>
                        <ul>
                            {dashData.recentTransactions?.map((transac) => {
                                return (
                                    <li key={transac.id} className="hover:bg-accent">
                                        <TransactionItem key={transac.id} transaction={transac} />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="rounded-md bg-white shadow-md">
                    <div className="p-3 lg:p-4">
                        <h2 className="text-xs md:text-sm lg:text-base font-semibold">Financial Overview</h2>
                        <div className="flex justify-center items-center">
                            <PieChart style={{ width: "100%", maxWidth: "400px", maxHeight: "40vh", aspectRatio: 1, margin: "20px" }} responsive>
                                <Pie data={dashData.recentTransactionPieChartData} innerRadius="80%" outerRadius="100%" cornerRadius="30%" fill="#8884d8" paddingAngle={4} dataKey="value" isAnimationActive={true} />
                                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: "12px", paddingTop: "30px" }} />
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                <div className="rounded-md bg-white shadow-md">
                    <div className="p-3 lg:p-4 flex justify-between">
                        <h2 className="text-xs md:text-sm lg:text-base font-semibold">Expenses</h2>
                        <Link to={"/dashboard/expense"} className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium">
                            See All <FaArrowRight />{" "}
                        </Link>
                    </div>
                    <div>
                        <ul>
                            {dashData.recentExpenses?.map((transac) => {
                                return (
                                    <li key={transac.id} className="hover:bg-accent">
                                        <TransactionItem transaction={transac} />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="rounded-md bg-white shadow-md">
                    <div className="p-3 lg:p-4  h-full">
                        <h2 className="text-xs md:text-sm lg:text-base font-semibold">Last 30 Days Expenses</h2>
                        <div className="flex justify-center items-center h-full">
                            <BarChart style={{ width: "100%", maxWidth: "400px", maxHeight: "40vh", aspectRatio: 1.618, margin: "20px" }} responsive data={dashData.recentExpenses}>
                                <YAxis width="auto" axisLine={false} />
                                <Tooltip />
                                <Bar margin={{ top: 10, right: 0, left: 0, bottom: 30 }} dataKey="amount" fill="#A664FF" maxBarSize={30} />
                                <LabelList dataKey="category" position="bottom" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
                <div className="order-2 md:order-1 rounded-md bg-white shadow-md">
                    <div className="p-3 lg:p-4 ">
                        <h2 className="text-xs md:text-sm lg:text-base font-semibold">Last 60 Days Income</h2>
                        <div className="flex justify-center items-center">
                            <PieChart style={{ width: "100%", maxWidth: "400px", maxHeight: "40vh", aspectRatio: 1, margin: "20px" }} responsive>
                                <Pie data={dashData.recentIncomesPieChartData} innerRadius="80%" outerRadius="100%" cornerRadius="30%" fill="#8884d8" paddingAngle={4} dataKey="value" isAnimationActive={true} />
                                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: "12px", paddingTop: "30px" }} />
                            </PieChart>
                        </div>
                    </div>
                </div>
                <div className="order-1 md:order-2 rounded-md bg-white shadow-md">
                    <div className="p-3 lg:p-4 flex justify-between">
                        <h2 className="text-xs md:text-sm lg:text-base font-semibold">Income</h2>
                        <Link to={"/dashboard/income"} className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium">
                            See All <FaArrowRight />{" "}
                        </Link>
                    </div>
                    <div>
                        <ul>
                            {dashData.recentIncomes?.map((transac) => {
                                return (
                                    <li key={transac.id} className="hover:bg-accent">
                                        <TransactionItem transaction={transac} />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashHome;
