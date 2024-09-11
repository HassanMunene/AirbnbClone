// Import the Loader component from the specified path
import Loader from "@/components/Loader";

/**
 * Loading component acts as a wrapper for the Loader component.
 * It is typically used to display a loading state during data fetching or processing.
 * 
 * @returns {JSX.Element} - Returns the JSX for the Loading component.
 */
const Loading = () => {
    return (
        // Render the Loader component
        <Loader />
    );
};

export default Loading;