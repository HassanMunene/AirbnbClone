'use client'; // Indicates this component is meant to run on the client side in Next.js

// Import necessary libraries and hooks
import { BiSearch } from "react-icons/bi";  // Import the BiSearch icon from the react-icons library
import useSearchModal from "@/app/hooks/useSearchModal";  // Hook to control the state of the search modal
import { useSearchParams } from "next/navigation";  // Hook to access query parameters from the URL
import useCountries from "@/app/hooks/useCountries";  // Hook to get country-related data
import { useMemo } from "react";  // React hook to memoize values for performance optimization
import { differenceInDays } from "date-fns";  // Utility function to calculate the difference between two dates

const Search = () => {
    // Access the search modal state and functions (e.g., onOpen) from the zustand store
    const searchModal = useSearchModal();
    const params = useSearchParams();  // Access the query parameters from the URL
    const { getCountryByValue } = useCountries();  // Function to get country details by value

    // Extract specific query parameters from the URL
    const locationValue = params?.get('locationValue');  // Get the location value from the query params
    const startDate = params?.get('startDate');  // Get the start date from the query params
    const endDate = params?.get('endDate');  // Get the end date from the query params
    const guestCount = params?.get('guestCount');  // Get the guest count from the query params

    // Memoized value for the location label
    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getCountryByValue(locationValue)?.label;  // Get the country label if locationValue exists
        }
        return 'Anywhere';  // Default to 'Anywhere' if no location is selected
    }, [getCountryByValue, locationValue]);

    // Memoized value for the duration label (e.g., '3 Days')
    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            let diff = differenceInDays(end, start);  // Calculate the number of days between startDate and endDate

            if (diff === 0) {
                diff = 1;  // If start and end dates are the same, set the duration to 1 day
            }
            return `${diff} Days`;  // Return the number of days as a string
        }
        return 'Any week';  // Default to 'Any week' if no dates are selected
    }, [startDate, endDate]);

    // Memoized value for the guest label (e.g., '2 Guests')
    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`;  // Return the guest count if specified
        }
        return 'Add guests';  // Default to 'Add guests' if no guest count is specified
    }, [guestCount]);

    return (
        // Main div container for the search bar; clicking on it triggers the modal open action
        <div 
            onClick={searchModal.onOpen}  // Invoke the onOpen function to open the search modal
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
            {/* Flexbox to align and space the search bar's content */}
            <div className="flex flex-row items-center justify-between">

                {/* Display the location label (e.g., 'Anywhere' or the selected country) */}
                <div className="text-sm font-semibold px-6">{locationLabel}</div>

                {/* Display the duration label (e.g., 'Any week' or '3 Days'), hidden on small screens */}
                <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
                    {durationLabel}
                </div>

                {/* Container for the guest label and search icon */}
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    
                    {/* Display the guest label (e.g., 'Add guests' or '2 Guests'), hidden on small screens */}
                    <div className="hidden sm:block">{guestLabel}</div>

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
