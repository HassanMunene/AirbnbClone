'use client'
// this is the base Modal from which all other modals will use as template
// isOpen property is very important because it controls the visibility of the modal

/**
 * BaseModal component serves as a reusable modal template.
 * It handles displaying a modal dialog with customizable content and actions.
 *
 * @param {Object} props - The properties passed to the modal component.
 * @param {boolean} props.disabled - Indicates if the modal or its buttons should be disabled.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {string} props.modalTitle - The title to display in the modal header.
 * @param {JSX.Element} props.modalBody - The content to display in the modal body.
 * @param {string} props.primaryLabel - The label for the primary submit button.
 * @param {string} props.secondaryLabel - The label for the secondary button, if any.
 * @param {Function} props.handleSecondaryLabelSubmit - Function to handle click events for secondary buttons.
 * @param {JSX.Element} props.socialSigninSection - Optional section for social sign-in buttons.
 * @param {Function} props.onClose - Function to be called when the modal is closed.
 * @param {Function} props.onSubmit - Function to be called when the primary submit button is clicked.
 * 
 * @returns {JSX.Element|null} - Returns the modal JSX or null if `isOpen` is false.
 */

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
    }, [onClose, disabled])

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