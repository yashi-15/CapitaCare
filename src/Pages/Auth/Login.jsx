import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RightSection from "./RightSection";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {

    const {updateUser, setIsAuthenticated} = useContext(UserContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user)
                setIsAuthenticated(true)
                navigate("/dashboard");
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="flex h-screen bg-light">
            <div className="basis-2/3 flex justify-center items-center">
                <div className="w-sm">
                    <div className="my-8 mx-4">
                        <h1 className="text-center text-4xl font-bold mb-4">Welcome back</h1>
                        <p className="text-center">Welcome back! Please enter your details</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" className="border border-primary rounded-md p-2 focus:outline-primary focus:outline-1" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" className="border border-primary rounded-md p-2 focus:outline-primary focus:outline-1" />
                        <button onClick={handleSubmit} className="bg-primary text-white p-2 font-semibold rounded-full">
                            Log in
                        </button>
                    </div>
                    <div className="my-4">
                        <p className="text-center">
                            Don't have an account?{" "}
                            <Link to={"/signup"}>
                                <span className="text-primary font-semibold">Sign up</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <RightSection />
        </div>
    );
};

export default Login;
