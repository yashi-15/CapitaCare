import EmojiPicker from "emoji-picker-react";
import React, { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import EmojiPickerModal from "./EmojiPickerModal";
import showToast from "../utils/showToast";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { BiScan } from "react-icons/bi";

const AddTransactionPopUp = ({ type, closePopup, submit }) => {
    const [emoji, setEmoji] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");

    const [scanningState, setScanningState] = useState(false);
    const [scannedFileName, setScannedFileName] = useState("");

    const FileInputRef = useRef();

    const handleReceiptScan = async (file) => {
        setScanningState(true);
        if (file.size > 5 * 1024 * 1024) {
            setScanningState(false);
            showToast(false, "File size should be less than 5MB");
            return;
        }
        if (!file.type.startsWith("image/")) {
            setScanningState(false);
            showToast(false, "Please upload an image file");
            return;
        }

        const formData = new FormData();
        formData.append("receipt", file);

        try{
            const response = await axiosInstance.post(API_PATHS.TRANSACTION.SCAN, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setScanningState(false);
            setCategory(response.data.category);
            setAmount(response.data.amount);
            setDate(response.data.date);
        }
        catch(err){
            setScanningState(false);
            setScannedFileName("")
            showToast(false, err.response.data.message || err.message)
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-xl bg-white">
                <div className="flex justify-between gap-2 p-4 border-b border-accent">
                    <h1 className="font-semibold">Add {type} </h1>
                    <button onClick={closePopup} className="text-secondary">
                        <RxCross1 />
                    </button>
                </div>
                <div className="p-4 flex flex-col gap-6">
                    <div>
                        <input
                            type="file"
                            ref={FileInputRef}
                            name="recipt"
                            className="hidden"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                setScannedFileName(file.name);
                                if (file) handleReceiptScan(file);
                            }}
                        />
                        <button type="button" className="bg-primary text-white p-2 font-semibold rounded-md w-full" onClick={() => FileInputRef.current?.click()}>
                            {scanningState ? (
                                <span>Scanning...</span>
                            ) : scannedFileName ? (
                                <span>{scannedFileName}</span>
                            ) : (
                                <span className="flex justify-center items-center gap-2">
                                    <span>
                                        <BiScan />
                                    </span>
                                    <span>Scan Recipt</span>
                                </span>
                            )}
                        </button>
                    </div>

                    <EmojiPickerModal icon={emoji} onSelect={(emoji) => setEmoji(emoji)} />
                    <div className="flex flex-col gap-3">
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" name="category" className=" bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" name="amount" className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" name="date" className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                        <textarea type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note.." name="note" className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                    </div>

                    <div className="self-end">
                        <button onClick={() => submit(emoji, category, amount, date, note)} className="bg-secondary text-white p-2 font-semibold rounded-md">
                            Add {type}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTransactionPopUp;
