import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="relative h-screen bg-bglight">
            <div className="absolute top-0 w-full p-5">
                <div className="flex justify-between gap-2">
                    <img src="logo.png" width={"50px"} height={"50px"} />
                    <Link to={"/login"}>
                        <button className="border border-primary shadow-lg shadow-zinc-500 py-2 px-4 rounded-full  text-black font-semibold cursor-pointer hover:scale-97 transition ease-in-out flex gap-2 items-center">
                            Login <MdArrowOutward size={28} className="text-black" />{" "}
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex gap-4 h-full max-w-7xl mx-auto justify-center items-center">
                <div className="basis-1/2 flex flex-col gap-5">
                    <h1 className="font-bold text-6xl">Track your money with precision and power</h1>
                    <p className="text-lg">CapitaCare simplifies expense tracking for individuals and small businesses. Manage your finances effortlessly with our intuitive digital tool.</p>
                    <div className="flex gap-4 items-center">
                        <Link to={"/login"}>
                            <button className="bg-primary py-2 px-4 rounded-sm shadow-lg shadow-zinc-600 text-white font-semibold cursor-pointer hover:scale-97 transition ease-in-out">Start Tracking</button>
                        </Link>
                        <button className="bg-white py-2 px-4 rounded-sm shadow-lg shadow-zinc-600 text-black font-semibold cursor-pointer hover:scale-97 transition ease-in-out">Learn More</button>
                    </div>
                </div>
                <img src="hero-man.png" className="" />
            </div>
        </div>
    );
};

export default Home;
