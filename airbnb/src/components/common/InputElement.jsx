'use client';

const InputElement = ({id, label, type="text", disabled, register, errors, formatPrice, required}) => {
    return (
        <div className="relative w-full">
            {formatPrice && (
                <div className="absolute top-5 left-2 text-neutral-700">Ksh</div>
            )}
            <input 
                type={type}
                id={id}
                disabled={disabled}
                {...register(id, {required})}
                placeholder=" "
                className={`w-full peer p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70
                    disabled:cursor-not-allowed ${formatPrice ? 'pl-9' : 'pl-4'} ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-neutral-300'}`}
            />
            <label 
                className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${formatPrice ? 'left-9' : 'left-4'}
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 
                    ${errors[id] ? 'text-rose-500' : 'text-zinc-500'}`}
            >
                {label}
            </label>
        </div>
    )
}

export default InputElement;