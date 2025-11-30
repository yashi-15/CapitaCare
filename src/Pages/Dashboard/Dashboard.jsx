import React, { useContext, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaCreditCard, FaHistory } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { HiCreditCard } from "react-icons/hi";
import { Link, NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import useUserAuth from "../../hooks/useUserAuth";

const Dashboard = () => {
    useUserAuth();

    const { user } = useContext(UserContext);

    const [moreOptions, setMoreOptions] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);

    return (
        user && (
            <div className="flex h-screen">
                <aside className="w-12 sm:w-16 md:w-44 lg:w-64 bg-white p-2 md:p-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-0 items-center justify-center md:justify-start">
                            <img src="logo.png" width={"19px"} height={"50px"} />
                            <h1 className="text-lg font-semibold">
                                <span className="hidden md:block">apitaCare</span>
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <input type="text" placeholder="Search..." className="p-2 text-sm focus:outline-2 focus:outline-accent rounded-md w-full border-2 border-accent" />
                        </div>
                    </div>
                    <div className="grow flex flex-col w-full overflow-auto">
                        <NavLink to={"/dashboard"} end className={({ isActive }) => `flex items-center gap-2 p-1 sm:p-2 m-1 font-semibold rounded-md text-sm lg:text-base ${isActive ? "bg-primary/15 text-primary" : "text-zinc-600"} `}>
                            <GoHomeFill className="w-5 h-5 sm:w-5 sm:h-5 lg:w-9 lg:h-9" /> <span className="hidden md:block">Home</span>
                        </NavLink>
                        <NavLink to={"/dashboard/income"} className={({ isActive }) => `flex items-center gap-2 p-1 sm:p-2 m-1 font-semibold rounded-md text-sm lg:text-base ${isActive ? "bg-primary/15 text-primary" : "text-zinc-600"} `}>
                            <GiReceiveMoney className="w-5 h-5 sm:w-5 sm:h-5 lg:w-9 lg:h-9" /> <span className="hidden md:block">Income</span>
                        </NavLink>
                        <NavLink to={"/dashboard/expense"} className={({ isActive }) => `flex items-center gap-2 p-1 sm:p-2 m-1 font-semibold rounded-md text-sm lg:text-base ${isActive ? "bg-primary/15 text-primary" : "text-zinc-600"} `}>
                            <GiPayMoney className="w-5 h-5 sm:w-5 sm:h-5 lg:w-9 lg:h-9" /> <span className="hidden md:block">Expenses</span>
                        </NavLink>
                        <NavLink to={"/dashboard/transactions"} className={({ isActive }) => `flex items-center gap-2 p-1 sm:p-2 m-1 font-semibold rounded-md text-sm lg:text-base ${isActive ? "bg-primary/15 text-primary" : "text-zinc-600"} `}>
                            <HiCreditCard className="w-5 h-5 sm:w-5 sm:h-5 lg:w-9 lg:h-9" /> <span className="hidden md:block">Recent</span>
                        </NavLink>
                    </div>
                    <div className="border-t-2 border-accent relative">
                        <div onClick={() => setMoreOptions((prev) => !prev)} className="flex items-center gap-4 md:p-2 w-full md:bg-primary/15 rounded-md mt-4">
                            <div className="bg-primary/15 md:bg-white p-2 rounded-full text-xs md:text-sm lg:text-base cursor-pointer">{(user.fullName.charAt(0) + user.fullName.split(" ")[1]?.charAt(0)).toUpperCase()} </div>
                            <div className="grow hidden md:block">
                                <h3 className="text-xs xl:text-base">{user.fullName}</h3>
                                <p className="text-[10px] font-light text-gray-700">{user.email}</p>
                            </div>
                            <div className="hidden lg:block hover:bg-accent p-1 rounded-full cursor-pointer">
                                <BsThreeDots />
                            </div>
                        </div>
                        {moreOptions && (
                            <div className="bg-accent absolute bottom-10 -right-12 md:bottom-16 md:right-0 z-40">
                                <div className="text-xs lg:text-sm py-2 px-4 hover:bg-primary/15 cursor-pointer">Settings</div>
                                <div onClick={() => setLogoutPopup(true)} className="text-xs lg:text-sm py-2 px-4 hover:bg-primary/15 cursor-pointer">
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
                <main className="flex-1 bg-accent overflow-auto p-1 sm:p-4 lg:p-8">
                    <h1 className="text-gray-800 font-semibold text-sm md:text-xl lg:text-2xl mt-2 sm:mt-0 pb-4 border-b-2 border-gray-200">Accounting dashboard</h1>
                    <Outlet />
                </main>
                {logoutPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="w-xl bg-white p-4">
                            <h1 className="text-lg font-semibold">Are you sure?</h1>
                            <div className="flex justify-end items-center gap-4">
                                <button className="bg-primary text-white p-2 font-semibold rounded-md">Cancel</button>
                                <button className="bg-secondary text-white p-2 font-semibold rounded-md">Logout</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    );
};

export default Dashboard;
