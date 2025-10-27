import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { IoWalletSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Bar, BarChart, Label, LabelList, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";

const DashHome = () => {
    const data = [
        { name: "Group A", value: 400, fill: "#0088FE" },
        { name: "Group B", value: 300, fill: "#00C49F" },
        { name: "Group C", value: 300, fill: "#FFBB28" },
    ];
    // #region Sample data
    const data2 = [
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

    return (
        <div className="py-3">
            <div className="grid grid-cols-3 gap-3 my-3">
                <div className="bg-white p-3 rounded-md shadow-md flex items-center gap-3">
                    <div className="p-3 bg-primary/15 text-primary rounded-full"><IoWalletSharp size={35} /></div>
                    <div>
                        <h2 className="text-gray-600 ">Balance</h2>
                        <h3 className="text-3xl font-semibold">Rs. 300000</h3>
                    </div>
                </div>
                <div className="bg-white p-3 rounded-md shadow-md flex items-center gap-3">
                    <div className="p-3 bg-primary/15 text-primary rounded-full"><GiReceiveMoney size={35} /></div>
                    <div>
                        <h2 className="text-gray-600 ">Income</h2>
                        <h3 className="text-3xl font-semibold">Rs. 400000</h3>
                    </div>
                </div>
                <div className="bg-white p-3 rounded-md shadow-md flex items-center gap-3">
                    <div className="p-3 bg-primary/15 text-primary rounded-full"><GiPayMoney size={35} /></div>
                    <div>
                        <h2 className="text-gray-600 ">Expense</h2>
                        <h3 className="text-3xl font-semibold">Rs. 100000</h3>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 my-3">
                <div className="rounded-md bg-white shadow-md">
                    <div className="p-4 flex justify-between">
                        <h2 className="font-semibold">Recent Transactions</h2>
                        <Link to={"/dashboard/transactions"} className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium">
                            See All <FaArrowRight />{" "}
                        </Link>
                    </div>
                    <div>
                        <ul>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-green-700 bg-green-200 px-2 rounded-full">+ $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-green-700 bg-green-200 px-2 rounded-full">+ $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-green-700 bg-green-200 px-2 rounded-full">+ $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-green-700 bg-green-200 px-2 rounded-full">+ $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-green-700 bg-green-200 px-2 rounded-full">+ $12000</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="rounded-md bg-white shadow-md">
                    <div className="p-4">
                        <h2 className="font-semibold">Financial Overview</h2>
                        <div className="flex justify-center items-center">
                            <PieChart style={{ width: "100%", maxWidth: "400px", maxHeight: "40vh", aspectRatio: 1, margin: "20px" }} responsive>
                                <Pie data={data} innerRadius="80%" outerRadius="100%" cornerRadius="30%" fill="#8884d8" paddingAngle={4} dataKey="value" isAnimationActive={true} />
                                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: "12px", paddingTop: "30px" }} />
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 my-3">
                <div className="rounded-md bg-white shadow-md">
                    <div className="p-4 flex justify-between">
                        <h2 className="font-semibold">Expenses</h2>
                        <Link to={"/dashboard/expense"} className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium">
                            See All <FaArrowRight />{" "}
                        </Link>
                    </div>
                    <div>
                        <ul>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-red-700 bg-red-200 px-2 rounded-full">- $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-red-700 bg-red-200 px-2 rounded-full">- $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-red-700 bg-red-200 px-2 rounded-full">- $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-red-700 bg-red-200 px-2 rounded-full">- $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-red-700 bg-red-200 px-2 rounded-full">- $12000</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="rounded-md bg-white shadow-md">
                    <div className="p-4 h-full">
                        <h2 className="font-semibold">Last 30 Days Expenses</h2>
                        <div className="flex justify-center items-center h-full">
                            <BarChart style={{ width: "100%", maxWidth: "400px", maxHeight: "40vh", aspectRatio: 1.618, margin: "20px" }} responsive data={data2}>
                                <YAxis width="auto" axisLine={false} />
                                <Tooltip />
                                <Bar margin={{ top: 10, right: 0, left: 0, bottom: 30 }} dataKey="uv" fill="#A664FF" />
                                <LabelList dataKey="name" position="bottom" />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 my-3">
                <div className="rounded-md bg-white shadow-md">
                    <div className="p-4">
                        <h2 className="font-semibold">Last 60 Days Income</h2>
                        <div className="flex justify-center items-center">
                            <PieChart style={{ width: "100%", maxWidth: "400px", maxHeight: "40vh", aspectRatio: 1, margin: "20px" }} responsive>
                                <Pie data={data} innerRadius="80%" outerRadius="100%" cornerRadius="30%" fill="#8884d8" paddingAngle={4} dataKey="value" isAnimationActive={true} />
                                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: "12px", paddingTop: "30px" }} />
                            </PieChart>
                        </div>
                    </div>
                </div>
                <div className="rounded-md bg-white shadow-md">
                    <div className="p-4 flex justify-between">
                        <h2 className="font-semibold">Income</h2>
                        <Link to={"/dashboard/income"} className="flex items-center gap-2 bg-accent rounded-sm px-2 py-1 text-xs hover:bg-primary/15 hover:text-primary font-medium">
                            See All <FaArrowRight />{" "}
                        </Link>
                    </div>
                    <div>
                        <ul>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-green-700 bg-green-200 px-2 rounded-full">+ $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-green-700 bg-green-200 px-2 rounded-full">+ $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-green-700 bg-green-200 px-2 rounded-full">+ $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-green-700 bg-green-200 px-2 rounded-full">+ $12000</div>
                                </div>
                            </li>
                            <li className="hover:bg-accent">
                                <div className="my-2 px-5 py-3 flex items-center gap-3">
                                    <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center">🛍️</div>
                                    <div className="grow">
                                        <h4 className="font-semibold">Shopping</h4>
                                        <p className="text-xs text-gray-500">27th Oct 2025</p>
                                    </div>
                                    <div className="text-xs text-green-700 bg-green-200 px-2 rounded-full">+ $12000</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashHome;
