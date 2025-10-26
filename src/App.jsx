import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashHome from "./Pages/Dashboard/DashHome";
import Income from "./Pages/Dashboard/Income";
import Expense from "./Pages/Dashboard/Expense";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<DashHome />} />
                        <Route path="income" element={<Income />} />
                        <Route path="expense" element={<Expense />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
