import React from 'react';
import { Link } from "react-router-dom";

const MenuItem = ({text,url}) => {
    const items = [
        { 
            id: 'home',
            title: 'Home',
            path: '/',
        },
        { 
            id: 'nav1',
            title: 'Navigation 1',
            path: '/nav1',
        },
        { 
            id: 'nav2',
            title: 'Nav Item 2',
            path: '/nav2',
        },
    ]
    return (
        <ul>
            {items.map((item,index) => (
                <li key={item.id}>
                    <Link className="w-full h-12 tablet:w-12 px-2 tablet:px-2 md:px-6 py-3 md:hover:bg-purple-100 justify-start items-center gap-3 inline-flex text-lg text-white md:text-black font-normal font-['Figtree'] leading-snug" to={item.path}>
                        <span className="text-base tablet:hidden">{item.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default MenuItem;