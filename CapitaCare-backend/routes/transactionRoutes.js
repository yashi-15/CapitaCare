const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { fetchTransactions, addTransaction, updateTransaction, deleteTransaction } = require("../controllers/transactionController");

const router = express.Router();

router.get("/", protect, fetchTransactions);
router.post("/", protect, addTransaction);
router.put("/:id", protect, updateTransaction);
router.delete("/:id", protect, deleteTransaction);

module.exports = router