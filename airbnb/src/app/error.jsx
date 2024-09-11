'use client';

import EmptyComponent from "@/components/common/EmptyComponent";
import { useEffect } from "react";

/**
 * ErrorState component is used to handle and display error states in the application.
 * It logs the error to the console and displays a user-friendly error message.
 * 
 * @param {Object} props - The component props.
 * @param {Error} props.error - The error object to be handled and logged.
 * 
 * @returns {JSX.Element} - Returns the JSX for the ErrorState component.
 */
const ErrorState = ({ error }) => {
    // useEffect hook to log the error to the console when the error prop changes
    useEffect(() => {
        console.error(error); // Log the error to the console for debugging purposes
    }, [error]);

    return (
        // Render the EmptyComponent with an error message
        <EmptyComponent
            title="Uh oh"
            subtitle="Something went wrong!"
        />
    );
}

export default ErrorState;