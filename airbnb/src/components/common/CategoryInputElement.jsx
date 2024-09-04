'use client';
// this will represent each category when creating a listing
// during the first step

const CategoryInputElement = ({onCategorySelect, label, icon: Icon, selected}) => {

    const handleClickCategory = () => {
        onCategorySelect(label);
    }

    return (
        <div 
            onClick={handleClickCategory}
            className={`flex flex-col gap-3 rounded-xl border-2 p-4 hover:border-rose-500 transition cursor-pointer
            ${selected ? 'border-rose-500' : 'border-neutral-200'}`}>
                <Icon size={30} />
                <div className="font-semibold">{label}</div>
        </div>
    )
}

export default CategoryInputElement;