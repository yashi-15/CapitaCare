import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashHome from "./Pages/Dashboard/DashHome";
import Income from "./Pages/Dashboard/Income";
import Expense from "./Pages/Dashboard/Expense";
import Transactions from "./Pages/Dashboard/Transactions";
import UserProvider from "./context/userContext";

function App() {
    return (
        <>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/dashboard" element={<Dashboard />}>
                            <Route index element={<DashHome />} />
                            <Route path="income" element={<Income />} />
                            <Route path="expense" element={<Expense />} />
                            <Route path="transactions" element={<Transactions />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </>
    );
}

export default App;
