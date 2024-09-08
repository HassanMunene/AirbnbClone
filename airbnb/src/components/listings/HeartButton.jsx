'use client'

//This is the buttton that shows A heart on the listing display
// user can click it to make it a favorite and vice-versa
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const HeartButton = ({listingId, currentUser}) => {
    const hasBeenFavorited = false;
    const toggleFavorite = () => {};

    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart size={28} className="absolute fill-white -top-[2px] -right-[2px]" />
            <AiFillHeart size={24} className={hasBeenFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} />
        </div>
    )
}

export default HeartButton;