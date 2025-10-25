const { json } = require("express");
const Transaction = require("../models/Transaction");

exports.fetchTransactions = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(404).json({ message: "User not found" });
    }

    try {
        const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
        return res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching transactions", error: err.message });
    }
};
exports.addTransaction = async (req, res) => {
    const { type, amount, category, date, note, receiptUrl } = req.body;
    const userId = req.user.id;

    if (!type || !amount || !category) {
        return res.status(400).json({ message: "Type, Amount and Category fields are necessary" });
    }

    if (!["income", "expense"].includes(type)) {
        res.status(400).json({ message: "Type must be 'income' or 'expense'" });
    }

    if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    if (note && note.length > 500) {
        return res.status(400).json({ message: "Note cannot exceed 500 characters" });
    }

    try {
        const transaction = new Transaction({
            user: userId,
            type,
            amount,
            category,
            date: date ? new Date(date) : Date.now(),
            note,
            receiptUrl,
        });

        await transaction.save();

        res.status(200).json({
            transaction,
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Validation error",
                error: err.message,
            });
        }
        res.status(500).json({
            message: "Error adding transaction",
            error: err.message,
        });
    }
};
exports.updateTransaction = async (req, res) => {
    const { type, amount, category, date, note, receiptUrl } = req.body;

    if (type && !["income", "expense"].includes(type)) {
        res.status(400).json({ message: "Type must be 'income' or 'expense'" });
    }

    if (amount && amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    if (note && note.length > 500) {
        return res.status(400).json({ message: "Note cannot exceed 500 characters" });
    }
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { type, amount, category, date, note, receiptUrl },
            {
                new: true,
                runValidators: true,
            }
        );
        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found or unauthorized",
            });
        }

        res.json({ transaction });
    } catch (err) {
        res.status(500).json({ message: "Error updating transaction" });
    }
};
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({ 
                message: "Transaction not found or unauthorized" 
            });
        }
        res.json({ message: "Transaction deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};
