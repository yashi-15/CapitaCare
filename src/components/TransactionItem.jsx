import React, { useState } from "react";
import TransactionViewPopup from "./TransactionViewPopup";

const TransactionItem = ({ transaction }) => {
    const [viewTransaction, setViewTransaction] = useState(false);

    return (
        <div>
            <div onClick={() => setViewTransaction(true)} className="my-2 px-3 lg:px-5 py-1 lg:py-3 flex items-center gap-3 hover:bg-accent">
                <div className="p-1 rounded-full bg-accent w-10 h-10 text-xl text-center flex justify-center items-center">{<img src={transaction.emoji || "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4b0.png"} width={24} />}</div>
                <div className="grow">
                    <h4 className="text-xs md:text-sm lg:text-base font-semibold">{transaction.category}</h4>
                    <p className="text-[9px] lg:text-xs text-gray-500">{new Date(transaction.date).toDateString()}</p>
                </div>
                <div className={`text-[10px] md:text-xs ${transaction.type === "income" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"} px-2 rounded-full`}>
                    {transaction.type === "income" ? <span>+</span> : <span>-</span>} {transaction.amount}
                </div>
            </div>
            {viewTransaction && <TransactionViewPopup transaction={transaction} closePopup={() => setViewTransaction(false)} />}
        </div>
    );
};

export default TransactionItem;
