import React, {useState} from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const ToggleMenu = ({ children, title }) => {
    const [toggle,setToggle] = useState(false)
    return (
        <div className="sm:rounded px-4 py-0 sm:p-4 sm:mb-4 bg-white sm:drop-shadow text-left">
            <button className="sm:cursor-default text-bold relative text-left w-full pb-2 mb-2 bg-white border-b border-b-black" 
                onClick={(e) => setToggle(!toggle)}>
                <h3 className="flex-1 font-jost font-bold text-slate-500 sm:font-bebas text-lg sm:text-orange-500 font-bold inline-block">{title}</h3>
                {toggle ?
                <ChevronUpIcon className="sm:hidden w-4 h-4 absolute right-0 top-2 text-slate-500"/>
                :
                <ChevronDownIcon className="sm:hidden w-4 h-4 absolute right-0 top-2 text-slate-500"/>
                }
            </button>
            <div className={`${toggle ? 'block' : 'hidden'} pb-4 sm:pb-0 sm:block`}>
                {children}
            </div>
        </div>
    )
}

export default ToggleMenu;