'use client';
// we will define a dropdown menu that will enable us to select a country

import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

const SelectCountryDropdown = ({value, onLocationChange}) => {
    const { getAllCountries } = useCountries();

    const handleChange = (selectedValue) => {
        onLocationChange(selectedValue);
    }

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAllCountries()}
                value={value}
                onChange={handleChange}
                formatOptionLabel={(option) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>{option.flag}</div>
                        <div>
                            {option.label}
                            <span className="text-neutral-500 ml-1">{option.region}</span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
    )
}

export default SelectCountryDropdown;