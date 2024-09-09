'use client';

// Import the DateRange component from the react-date-range library for selecting date ranges.
import { DateRange } from "react-date-range";

// Import the required CSS files for the react-date-range library's default styles and theme.
import 'react-date-range/dist/styles.css';        // Import default styles
import 'react-date-range/dist/theme/default.css'; // Import default theme

// Define the CalendarInput component, which takes three props:
// 1. value: The selected date range to be displayed.
// 2. onChange: A function to handle changes when the user selects new dates.
// 3. disabledDates: An array of dates that should be disabled from selection.
const CalendarInput = ({ value, onChange, disabledDates }) => {
    return (
        // Render the DateRange component with the following properties:
        <DateRange
            // The color to highlight the selected date range (as an array, since rangeColors expects an array of colors).
            rangeColors={['#262626']}
            
            // Pass the current selected range (value) to the component. The ranges prop expects an array.
            ranges={[value]}
            
            // Set the default displayed date to today's date.
            date={new Date()}
            
            // Trigger the onChange function when the user selects or changes a date range.
            onChange={onChange}
            
            // Set the calendar display direction to vertical (default is horizontal).
            direction="vertical"
            
            // Hide the default top-level date display, which shows the selected date range above the calendar.
            showDateDisplay={false}
            
            // Prevent selecting dates earlier than today by setting the minimum date to the current date.
            minDate={new Date()}
            
            // Pass the array of dates that should be disabled from selection (e.g., reserved dates).
            disabledDates={disabledDates}
        />
    );
}

export default CalendarInput;