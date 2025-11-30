import React, { useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import ConfirmDelete from "./ConfirmDelete";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import EmojiPickerModal from "./EmojiPickerModal";
import showToast from "../utils/showToast";

const TransactionViewPopup = ({ transaction, closePopup, onUpdation, onDeletion }) => {
    const [deletePopup, setDeletePopup] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const confirmDelete = async () => {
        try {
            const response = await axiosInstance.delete(API_PATHS.TRANSACTION.DELETE(transaction._id));
            if (response.status === 200) {
                setDeletePopup(false);
                onDeletion(transaction._id)
                closePopup();
                showToast( true, "Transaction deleted");
            }
        } catch (error) {
            setDeletePopup(false);
            showToast(false, error);
        }
    };

    const [emoji, setEmoji] = useState(transaction.emoji);
    const [category, setCategory] = useState(transaction.category);
    const [amount, setAmount] = useState(transaction.amount);
    const [date, setDate] = useState(transaction.date);
    const [note, setNote] = useState(transaction.note);

    const updateTransaction = async () => {
        const data = {
            emoji: emoji || "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b0.png",
            category,
            amount,
            date,
            note,
        };
        try {
            const response = await axiosInstance.put(API_PATHS.TRANSACTION.UPDATE(transaction._id), data);
            if (response.status === 200) {
                showToast(true, "Transaction updated");
                onUpdation(response.data.transaction)
                closePopup();
            }
        } catch (error) {
            showToast(false, error);
        }
    };

    const resetValues = () => {
        setEmoji(transaction.emoji);
        setCategory(transaction.category);
        setAmount(transaction.amount);
        setDate(transaction.date);
        setNote(transaction.note);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-[80%] sm:w-lg md:w-xl bg-white">
                <div className="flex justify-between gap-2 p-4 border-b border-accent">
                    {editMode ? (
                        <div className="flex items-center gap-3">
                            <h1 className="font-semibold text-sm sm:text-base"> Edit Transaction </h1>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center flex justify-center items-center">{<img src={transaction.emoji} width={24} />}</div>
                            <h1 className="font-semibold"> {transaction.category} </h1>
                        </div>
                    )}
                    <button onClick={closePopup} className="text-secondary cursor-pointer">
                        <RxCross1 />
                    </button>
                </div>
                {editMode ? (
                    <div className="p-4 flex flex-col gap-1 sm:gap-2 h-90 sm:h-70 overflow-y-auto">
                        <EmojiPickerModal icon={emoji} onSelect={(emoji) => setEmoji(emoji)} />
                        <span className="text-[10px] sm:text-xs">Category:</span>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" name="category" className=" bg-secondary/12 text-xs sm:text-base rounded-md p-2 focus:outline-secondary focus:outline-1" />
                        <span className="text-[10px] sm:text-xs">Amount:</span>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" name="amount" className="bg-secondary/12 text-xs sm:text-base rounded-md p-2 focus:outline-secondary focus:outline-1" />
                        <span className="text-[10px] sm:text-xs">Date: </span>
                        <input type="date" value={date ? new Date(date).toISOString().split("T")[0] : ""} onChange={(e) => setDate(e.target.value)} placeholder="Date" name="date" className="bg-secondary/12 text-xs sm:text-base rounded-md p-2 focus:outline-secondary focus:outline-1" />
                        <span className="text-[10px] sm:text-xs">Note:</span>
                        <textarea type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note.." name="note" className="bg-secondary/12 text-xs sm:text-base min-h-20 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                    </div>
                ) : (
                    <div className="p-4 flex flex-col gap-2 h-60 overflow-y-auto">
                        <h2 className={`${transaction.type === "income" ? "text-green-700 bg-green-200" : "text-red-700 bg-red-200"} px-2 w-fit rounded-full sm:text-xl font-semibold`}>
                            {transaction.type === "income" ? <span>+</span> : <span>-</span>} {transaction.amount}
                        </h2>
                        <h2 className="text-gray-500 text-xs sm:text-sm">{new Date(transaction.date).toDateString()}</h2>
                        <div className="mt-3">
                            <h2 className="text-xs sm:text-sm">Note</h2>
                            <div className="bg-accent min-h-20 p-2">
                                <h3 className="font-light text-xs sm:text-base">{transaction.note || "-"}</h3>
                            </div>
                        </div>
                    </div>
                )}
                {editMode ? (
                    <div className="flex justify-end gap-2 p-4 border-b border-accent">
                        <button
                            onClick={() => {
                                setEditMode(false);
                                resetValues();
                            }}
                            className="bg-secondary text-white text-sm sm:text-base p-2 font-semibold rounded-md flex items-center gap-1 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button onClick={updateTransaction} className="bg-primary text-white text-sm sm:text-base p-2 font-semibold rounded-md flex items-center gap-1 cursor-pointer">
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-end gap-2 p-4 border-b border-accent">
                        <button onClick={() => setEditMode(true)} className="bg-primary text-white text-sm sm:text-base p-2 font-semibold rounded-md flex items-center gap-1 cursor-pointer">
                            <MdModeEdit /> Edit
                        </button>
                        <button onClick={() => setDeletePopup(true)} className="bg-secondary text-white text-sm sm:text-base p-2 font-semibold rounded-md flex items-center gap-1 cursor-pointer">
                            <MdDelete /> Delete
                        </button>
                    </div>
                )}
            </div>
            {deletePopup && <ConfirmDelete closePopup={() => setDeletePopup(false)} confirm={confirmDelete} />}
        </div>
    );
};

export default TransactionViewPopup;
