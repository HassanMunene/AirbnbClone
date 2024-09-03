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

const Categories = () => {
    const categories = [
        {label: 'Beach', icon: TbBeach, description: 'This property is close to a beach', index: 1},
        {label: 'Windmill', icon: GiWindmill, description: 'This property has windmills', index: 2},
        {label: 'Moder', icon: MdOutlineVilla, description: 'This is a modern property', index: 3},
        {label: 'Countryside', icon: TbMountain, description: 'This property is in the countryside', index: 4},
        {label: 'Swimmingpool', icon: TbPool, description: 'This property has a swimming pool', index: 5},
        {label: 'Island', icon: GiIsland, description: 'This property is in an island', index: 6},
        {label: 'Lake', icon: GiBoatFishing, description: 'This property is close to a lake', index: 7},
        {label: 'Skiing', icon: FaSkiing, description: 'This property is close to skiing activities', index: 8},
        {label: 'Castle', icon: GiCastle, description: 'This property is in a castle', index: 9},
        {label: 'Camping', icon: GiForestCamp, description: 'This property has camping activies', index: 10},
        {label: 'Arctic', icon: BsSnow, description: 'This property is in the arctic', index: 11},
        {label: 'Cave', icon: GiCaveEntrance, description: 'This property is in a cave', index: 12},
        {label: 'Desert', icon: GiCactus, description: 'This property is in the desert', index: 13},
        {label: 'Barns', icon: GiBarn, description: 'This property is in the barn', index: 14},
        {label: 'Luxurious', icon: IoDiamond, description: 'This property is luxurious', index: 15},
    ]
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