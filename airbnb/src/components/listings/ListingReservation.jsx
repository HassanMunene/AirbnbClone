'use client';

import Button from "../common/Button";
// Import the CalendarInput component for date range selection
import CalendarInput from "../common/CalendarInput";

// Functional component 'ListingReservation' to render a reservation interface
const ListingReservation = ({price, totalPrice, onChangeDate, dateRange, onSubmit, disabled, disabledDates}) => {
    
    return (
        // Main container with white background, rounded corners, border, and overflow hidden for styling
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">

            {/* Pricing section with price and label */}
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">KSH {price}</div>
                <div className="font-light text-neutral-600">per night</div>
            </div>
            <hr />
            {/* Calendar input for selecting date range */}
            <CalendarInput 
                value={dateRange}               // The currently selected date range
                disabledDates={disabledDates}    // Dates that should be disabled/unavailable for selection
                onChange={(value) => onChangeDate(value.selection)} // Update the date range when the user selects new dates
            />
            <hr />
            <div className="p-4">
                <Button disabled={disabled} label="Reserve" onClick={onSubmit}/>
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>Total</div>
                <div>KSH {totalPrice}</div>
            </div>
        </div>
    )
}

export default ListingReservation;