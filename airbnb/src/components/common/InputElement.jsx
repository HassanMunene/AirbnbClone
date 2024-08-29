const InputElement = ({id, label, type="text", disabled, formatPrice, required}) => {
    return (
        <div className="relative w-full">
            {formatPrice && (
                <div className="absolute top-5 left-2 text-neutral-700">Ksh</div>
            )}
            <input 
                type={type}
                id={id}
                disabled={disabled}
                required={required}
                placeholder=" "
                className={`w-full peer p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70
                    disabled:cursor-not-allowed ${formatPrice ? 'pl-9' : 'pl-4'}`}
            />
            <label 
                className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${formatPrice ? 'left-9' : 'left-4'}
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-zinc-500`}>
                {label}
            </label>
        </div>
    )
}

export default InputElement;