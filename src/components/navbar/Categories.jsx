'use client';

import Container from "../common/Container";
import {TbBeach, TbMountain, TbPool} from "react-icons/tb";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import CategoryBox from "../common/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {label: 'Beach', icon: TbBeach, description: 'This property is close to a beach'},
    {label: 'Windmill', icon: GiWindmill, description: 'This property has windmills'},
    {label: 'Modern', icon: MdOutlineVilla, description: 'This is a modern property'},
    {label: 'Countryside', icon: TbMountain, description: 'This property is in the countryside'},
    {label: 'Swimmingpool', icon: TbPool, description: 'This property has a swimming pool'},
    {label: 'Island', icon: GiIsland, description: 'This property is in an island'},
    {label: 'Lake', icon: GiBoatFishing, description: 'This property is close to a lake'},
    {label: 'Skiing', icon: FaSkiing, description: 'This property is close to skiing activities'},
    {label: 'Castle', icon: GiCastle, description: 'This property is in a castle'},
    {label: 'Camping', icon: GiForestCamp, description: 'This property has camping activies'},
    {label: 'Arctic', icon: BsSnow, description: 'This property is in the arctic'},
    {label: 'Cave', icon: GiCaveEntrance, description: 'This property is in a cave'},
    {label: 'Desert', icon: GiCactus, description: 'This property is in the desert'},
    {label: 'Barns', icon: GiBarn, description: 'This property is in the barn'},
    {label: 'Luxurious', icon: IoDiamond, description: 'This property is luxurious'},
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isThisIndexPage = pathname === '/'
    if (!isThisIndexPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <div key={item.label}>
                        <CategoryBox label={item.label} icon={item.icon} selected={category === item.label}/>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default Categories;