import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import EmojiPickerModal from "./EmojiPickerModal";

const AddTransactionPopUp = ({ type, closePopup, submit }) => {
    const [emoji, setEmoji] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");

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
                    <EmojiPickerModal icon={emoji} onSelect={(emoji)=> setEmoji(emoji)} />
                    <div className="flex flex-col gap-3">
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" name="category" className=" bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" name="amount" className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" name="date" className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                        <textarea type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note.." name="note" className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" />
                        {/* <input type='file' placeholder='Upload reciept' name='recipt' className="bg-secondary/12 rounded-md p-2 focus:outline-secondary focus:outline-1" /> */}
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
