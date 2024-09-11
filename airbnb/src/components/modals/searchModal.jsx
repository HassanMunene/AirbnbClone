'use client';

import useSearchModal from "@/app/hooks/useSearchModal";  // Hook to control the search modal state (open/close)
import { formatISO } from "date-fns";  // Utility for formatting dates to ISO strings
import dynamic from "next/dynamic";  // Used for dynamically importing components (for example, the Map component)
import { useRouter, useSearchParams } from "next/navigation";  // Next.js hooks to handle navigation and search parameters
import queryString from "query-string";  // Library for handling query strings in URLs
import { useCallback, useMemo, useState } from "react";  // React hooks
import HeaderComponent from "../common/HeaderComponent";  // Reusable header component
import SelectCountryDropdown from "../common/SelectCountryDropdown";  // Dropdown component for selecting countries
import CalendarInput from "../common/CalendarInput";  // Date range picker component
import AmenitiesCounter from "../common/AmenitiesCounter";  // Counter component for guests, rooms, and bathrooms
import BaseModal from "./BaseModal";  // Base modal component for consistent modal UI

// Steps for the search modal process
const STEPS = {
    LOCATION: 0,  // Step for selecting location
    DATE: 1,      // Step for selecting dates
    INFO: 2,      // Step for additional information like guest count, rooms, etc.
}

const SearchModal = () => {
    const router = useRouter();  // Used to navigate to different URLs
    const params = useSearchParams();  // Fetch current search parameters
    const searchModal = useSearchModal();  // Access to modal open/close state
    const [step, setStep] = useState(STEPS.LOCATION);  // Track current step in the modal process
    const [guestCount, setGuestCount] = useState(1);  // Track the number of guests
    const [roomCount, setRoomCount] = useState(1);  // Track the number of rooms
    const [bathroomCount, setBathroomCount] = useState(1);  // Track the number of bathrooms
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),  // Default start date
        endDate: new Date(),    // Default end date
        key: 'selection'  // Required for CalendarInput component
    });
    const [location, setLocation] = useState('');  // Track the selected location

    // Dynamically import the Map component to avoid server-side rendering
    const Map = useMemo(() => dynamic(() => import('../map/Map'), { ssr: false }), [location]);

    // Function to move back a step in the modal
    const goToPreviousStep = () => {
        setStep((value) => value - 1);
    }

    // Function to move to the next step in the modal
    const goToNextStep = () => {
        setStep((value) => value + 1);
    }

    // Handle form submission, which either moves to the next step or completes the search
    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return goToNextStep();  // Move to next step if not on the final step
        }

        // Create a query string with the selected filters
        let currentQuery = {};
        if (params) {
            currentQuery = queryString.parse(params.toString());  // Parse current URL params
        }

        const updatedQuery = {
            ...currentQuery,
            locationValue: location?.value,  // Add location to query
            guestCount: guestCount,  // Add guest count to query
            roomCount: roomCount,    // Add room count to query
            bathroomCount: bathroomCount,  // Add bathroom count to query
        }

        // Format and add start date and end date to the query
        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }
        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        // Generate a URL with the updated query
        const url = queryString.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        // Reset to the first step and close the modal after submission
        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url); // Navigate to the updated URL with the new filters
        router.refresh()
    }, [step, searchModal, location, router, guestCount, roomCount, bathroomCount, dateRange, goToNextStep, params]);

    // Determine the primary button label ("Next" or "Search")
    const primaryLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search';  // Final step
        }
        return 'Next';  // Default for earlier steps
    }, [step]);

    // Determine the secondary button label ("Back")
    const secondaryLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined;  // No back button on the first step
        }
        return 'Back';
    }, [step]);

    // Modal body content changes depending on the current step
    let bodyContent = <div></div>;

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-4">
                <HeaderComponent 
                    title="Where do you wanna go?"
                    subtitle="Find the perfect place"
                />
                <SelectCountryDropdown 
                    value={location}
                    onLocationChange={(value) => setLocation(value)}  // Set the selected location
                />
                <hr />
                <Map center={location?.latlng}/>
            </div>
        )
    }

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <HeaderComponent
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <CalendarInput 
                    value={dateRange}  // Date range state
                    onChange={(value) => setDateRange(value.selection)}  // Update date range
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <HeaderComponent
                    title="More Information"
                    subtitle="Find your perfect place"
                />
                <AmenitiesCounter 
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}  // Update guest count
                />
                <AmenitiesCounter 
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}  // Update room count
                />
                <AmenitiesCounter 
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}  // Update bathroom count
                />
            </div>
        )
    }

    // Return the modal with dynamic body content and buttons based on the current step
    return (
        <BaseModal
            isOpen={searchModal.isOpen}  // Control modal visibility
            modalTitle="Filter"  // Modal title
            modalBody={bodyContent}  // Dynamic body content based on step
            onClose={searchModal.onClose}  // Close modal handler
            primaryLabel={primaryLabel}  // Dynamic label for the primary button
            secondaryLabel={secondaryLabel}  // Dynamic label for the secondary button
            handleSecondaryLabelSubmit={step === STEPS.LOCATION ? undefined : goToPreviousStep}  // "Back" button handler
            onSubmit={onSubmit}  // Submit handler for the "Next" or "Search" button
        />
    )
}

export default SearchModal;  // Export the SearchModal component