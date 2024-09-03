'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import queryString from "query-string";

const CategoryBox = ({label, icon: Icon, selected}) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleCategoryClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = queryString.parse(params.toString());
        }
        const updatedQuery = {
            ...currentQuery,
            category: label,
        }
        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }
        const url = queryString.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});
        router.push(url);
    }, [label, params, router]);
    return (
        <div 
            onClick={handleCategoryClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition
            cursor-pointer ${selected ? 'text-neutral-800' : 'text-neutral-500'} ${selected ? 'border-b-neutral-800' : 'border-transparent'}`}>
                <Icon size={26} />
                <div className="font-medium text-sm">{label}</div>
        </div>
    )
}

export default CategoryBox;