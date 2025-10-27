import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaCreditCard, FaHistory } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { HiCreditCard } from "react-icons/hi";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-white p-4 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-0 items-center">
                        <img src="logo.png" width={"19px"} height={"50px"} />
                        <h1 className="text-lg font-semibold">apitaCare</h1>
                    </div>
                    <div>
                        <input type="text" placeholder="Search..." className="p-2 text-sm focus:outline-2 focus:outline-accent rounded-md w-full border-2 border-accent" />
                    </div>
                </div>
                <div className="grow flex flex-col w-full overflow-auto">
                    <NavLink to={"/dashboard"} end className={({ isActive }) => `flex items-center gap-2 p-2 m-1 font-semibold rounded-md ${isActive ? "bg-primary/15 text-primary" : "text-zinc-600"} `}>
                        {" "}
                        <GoHomeFill size={24} /> Home
                    </NavLink>
                    <NavLink to={"/dashboard/income"} className={({ isActive }) => `flex items-center gap-2 p-2 m-1 font-semibold rounded-md ${isActive ? "bg-primary/15 text-primary" : "text-zinc-600"} `}>
                        {" "}
                        <GiReceiveMoney size={24} /> Income
                    </NavLink>
                    <NavLink to={"/dashboard/expense"} className={({ isActive }) => `flex items-center gap-2 p-2 m-1 font-semibold rounded-md ${isActive ? "bg-primary/15 text-primary" : "text-zinc-600"} `}>
                        {" "}
                        <GiPayMoney size={24} /> Expenses
                    </NavLink>
                    <NavLink to={"/dashboard/transactions"} className={({ isActive }) => `flex items-center gap-2 p-2 m-1 font-semibold rounded-md ${isActive ? "bg-primary/15 text-primary" : "text-zinc-600"} `}>
                        {" "}
                        <HiCreditCard size={24} /> Recent
                    </NavLink>
                </div>
                <div className="border-t-2 border-accent">
                    <div className="flex items-center gap-4 p-2 w-full bg-primary/15 rounded-md mt-4">
                        <div className="bg-white p-2 rounded-full">DK </div>
                        <div className="grow">
                            <h3>Marvilo</h3>
                            <p className="text-xs font-light text-gray-700">UI/UX Designer</p>
                        </div>
                        <div>
                            <BsThreeDots />
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 bg-accent overflow-auto p-8">
                <h1 className="text-gray-800 font-semibold text-2xl pb-4 border-b-2 border-gray-200">Accounting dashboard</h1>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
