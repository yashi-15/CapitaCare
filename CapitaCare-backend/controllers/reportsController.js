const { json } = require("express");
const Transaction = require("../models/Transaction");

exports.fetchReports = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
        const incomes = transactions.filter((transac) => transac.type === "income");
        const expenses = transactions.filter((transac) => transac.type === "expense");

        const totalIncome = incomes.reduce((sum, transaction) => sum + transaction.amount, 0);
        const totalExpense = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);
        const totalBalance = totalIncome - totalExpense;

        const recentTransactions = transactions.slice(0, 5);
        const recentIncomes = incomes.slice(0, 5);
        const recentExpenses = expenses.slice(0, 5);

        // for (const transaction of transactions) {
        //     if (transaction.type === "income" && recentIncomes.length < 5) {
        //         recentIncomes.push(transaction);
        //     } else if (transaction.type === "expense" && recentExpenses.length < 5) {
        //         recentExpenses.push(transaction);
        //     }

        //     if (recentIncomes.length === 5 && recentExpenses.length === 5) break;
        // }

        return res.json({ totalBalance, totalIncome, totalExpense, recentTransactions, recentIncomes, recentExpenses });
    } catch (err) {
        res.status(500).json({ message: "Error fetching data", error: err.message });
    }
};
