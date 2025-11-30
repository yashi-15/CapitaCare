import React from "react";

const ConfirmDelete = ({closePopup, confirm}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-[85%] sm:w-xl md:w-2xl bg-white">
                <div className="flex justify-between gap-2 p-4 border-b border-accent">
                    <div className="flex items-center gap-3">
                        <h1 className="font-semibold"> Are you sure? </h1>
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                    <h2 className="text-sm sm:text-base">
                        This transaction will be deleted permanently.
                    </h2>
                </div>
                <div className="flex justify-end gap-2 p-4 border-b border-accent">
                    <button onClick={closePopup} className="bg-primary text-white p-2 font-semibold rounded-md flex items-center gap-1 cursor-pointer">
                         Cancel
                    </button>
                    <button onClick={confirm} className="bg-secondary text-white p-2 font-semibold rounded-md flex items-center gap-1 cursor-pointer">
                         Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
