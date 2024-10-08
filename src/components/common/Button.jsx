// this component will be used make a common button we will use in our Airbnb
// we can import it to other pieces of code to use it
// it will receive a number of props that will be used to customize it
'use client';

const Button = ({label, onClick, disabled, outline, small, icon: Icon}) => {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 hover:bg-gray-100 hover:text-black transition w-full 
            ${outline ? 'bg-white' : 'bg-rose-500'} ${outline ? 'border-black' : 'border-rose-500'} ${outline ? 'text-black' : 'text-white'}
            ${small ? 'py-1' : 'py-3'} ${small ? 'text-sm' : 'text-md'} ${small ? 'font-light' : 'font-semibold'} ${small ? 'border-[1px]' : 'border-[1px]'}`}
        >
                {Icon && (<Icon size={24} className="absolute left-4 top-3"/>)}
                {label}
        </button>
    )
}

export default Button;