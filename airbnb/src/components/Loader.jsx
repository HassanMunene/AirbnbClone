// Import the PuffLoader component from the react-spinners library
import { ClipLoader } from "react-spinners";

/**
 * Loader component displays a loading spinner centered on the page.
 * It uses the PuffLoader from react-spinners to indicate loading state.
 * 
 * @returns {JSX.Element} - Returns the JSX for the Loader component.
 */
const Loader = () => {
    return (
        <div className="h-[70vh] flex flex-col justify-center items-center">
            {/* PuffLoader component with customized size and color */}
            <ClipLoader
                size={50} // Size of the loader spinner
                color="red" // Color of the loader spinner
            />
        </div>
    );
};

export default Loader;