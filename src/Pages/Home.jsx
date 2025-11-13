import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="relative h-screen bg-light">
            <div className="absolute top-0 w-full p-3 sm:p-5">
                <div className="flex justify-between gap-2">
                    <img src="logo.png" className="w-7 h-7 sm:w-12 sm:h-12" />
                    <Link to={"/login"}>
                        <button className="border border-primary shadow-lg shadow-zinc-500 py-1 sm:py-2 px-3 sm:px-4 rounded-full text-xs sm:text-base text-black font-semibold cursor-pointer hover:scale-97 transition ease-in-out flex gap-2 items-center">
                            Login <MdArrowOutward className="text-black sm:w-6 sm:h-6" />{" "}
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-4 h-full max-w-7xl mx-auto justify-center items-center">
                <div className="mx-4 sm:mx-0 basis-1/2 flex flex-col gap-5">
                    <h1 className="font-bold text-2xl sm:text-4xl md:text-6xl">Track your money with precision and power</h1>
                    <p className="text-sm md:text-lg">CapitaCare simplifies expense tracking for individuals and small businesses. Manage your finances effortlessly with our intuitive digital tool.</p>
                    <div className="flex gap-4 items-center">
                        <Link to={"/login"}>
                            <button className="text-sm md:text-base bg-primary py-2 px-4 rounded-sm shadow-lg shadow-zinc-600 text-white font-semibold cursor-pointer hover:scale-97 transition ease-in-out">Start Tracking</button>
                        </Link>
                        <button className="text-sm md:text-base bg-white py-2 px-4 rounded-sm shadow-lg shadow-zinc-600 text-black font-semibold cursor-pointer hover:scale-97 transition ease-in-out">Learn More</button>
                    </div>
                </div>
                <img src="hero-man.png" className="mt-18 sm:mt-0 w-40 sm:w-50 md:w-80" />
            </div>
        </div>
    );
};

export default Home;
