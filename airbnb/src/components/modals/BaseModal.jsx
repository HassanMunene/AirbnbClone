'use client'
// this is the base Modal from which all other modals will use as template
// isOpen property is very important because it controls the visibility of the modal

{/* This base modal receives a number of props but the main props I wanna talk about are 
    1. mainLabel - signify that this button is the normal submit button
    2. handleSubmitModal function - this func will be triggered by normal submit buttons
    3. secondaryLabel - this signifies buttons such as 'Login with Google' kinda buttons
    4. handleSecondarySubmit function - this func will handle submit from these secondary label buttons
    5. the outline of these secondary buttons is always true to differentiate from main buttons
*/}


import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../common/Button";

const BaseModal= ({disabled, isOpen, modalTitle, modalBody, primaryLabel, secondaryLabel, handleSecondaryLabelSubmit, socialSigninSection, onClose, onSubmit,}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    //handle closing of the modal
    const handleCloseModal = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose])

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/70 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            {/*This next div is the one I tinkered with in height and overflow for md size and higher*/}
            <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-[90%] md:h-[90%] overflow-y-auto rounded-lg">
                <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="relative flex flex-col translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg w-full bg-white outline-none focus:outline-none">
                        {/* Header part */}
                        <div onClick={handleCloseModal} className="relative flex items-center justify-center p-6 rounded-lg border-b-[1px]">
                            <button className="absolute left-9 p-1 border-0 hover:opacity-70 transition">
                                <IoMdClose size={18}/>
                            </button>
                            <div className="text-lg font-semibold">{modalTitle}</div>
                        </div>
                        {/* Body part */}
                        <div className="relative p-6 flex-auto">
                            {modalBody}
                        </div>
                        {/* Footer part */}
                        <div className="flex flex-col gap p-6">
                            <div className="flex flex-row items-center gap-4 w-full">
                                {secondaryLabel && handleSecondaryLabelSubmit && (
                                    <Button
                                        disabled={disabled}
                                        label={secondaryLabel}
                                        onClick={handleSecondaryLabelSubmit}
                                        outline={true}
                                    />
                                )}
                                <Button
                                    label={primaryLabel}
                                    onClick={onSubmit}
                                    disabled={disabled}
                                />
                            </div>
                            {socialSigninSection}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BaseModal;