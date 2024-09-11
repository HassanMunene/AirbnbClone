'use client'; // Indicates this component is meant to run on the client side in Next.js

// Import the BiSearch icon from react-icons library
import { BiSearch } from "react-icons/bi";

// Import the useSearchModal hook to control the state of the search modal
import useSearchModal from "@/app/hooks/useSearchModal";

const Search = () => {
    // Access the search modal state and functions (e.g., onOpen) from the zustand store
    const searchModal = useSearchModal();

    return (
        // Main div container for the search bar; clicking on it triggers the modal open action
        <div 
            onClick={searchModal.onOpen}  // Invoke the onOpen function to open the search modal
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
            {/* Flexbox to align and space the search bar's content */}
            <div className="flex flex-row items-center justify-between">

                {/* 'Anywhere' text on the left side of the search bar */}
                <div className="text-sm font-semibold px-6">Anywhere</div>

                {/* 'Any week' text, hidden on small screens, shown on larger screens */}
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    Any week
                </div>

                {/* Container for the 'Add Guest' text and the search icon on the right */}
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    
                    {/* 'Add Guest' text, hidden on small screens, shown on larger screens */}
                    <div className="hidden sm:block">Add Guest</div>

                    {/* Search icon with a circular background */}
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch />  {/* BiSearch icon from react-icons */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;  // Export the Search component for use in other parts of the app