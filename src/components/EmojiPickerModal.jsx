import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { FiImage } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

const EmojiPickerModal = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="flex gap-3 items-center">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsOpen(true)}>
                    <button className="p-3 bg-accent rounded-md cursor-pointer">{icon ? <img width={"32px"} src={icon} /> : <FiImage size={"32px"} />}</button>
                    <div className="text-sm sm:text-base">Choose icon</div>
                </div>
                {isOpen && (
                    <div className="relative">
                        <div className="fixed">
                            <button className="p-1 bg-accent rounded-full border absolute -top-2 -right-2 z-10 cursor-pointer" onClick={() => setIsOpen(false)}>
                                <RxCross1 size={18} />
                            </button>
                            <EmojiPicker
                                open={isOpen}
                                onEmojiClick={(emoji) => {
                                    onSelect(emoji.imageUrl || "");
                                    setIsOpen(false);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default EmojiPickerModal;
