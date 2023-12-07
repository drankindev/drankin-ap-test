import React from 'react';
import { Link } from "react-router-dom";
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

const Header = ({ signOut }) => {
    return(
        <header className="w-full fixed z-50 px-6 py-4 bg-slate-400 drop-shadow">
            <div className="w-full relative flex">
                <div className="flex-1 text-left">          
                    <Link to="/" title="Home">
                        <span className="font-bebas text-4xl">
                        Blogeddaboudit<span className="text-red-700">!</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-none flex gap-2">
                    <Link className="align-bottom flex-none inline bg-transparent text-black hover:text-white" to="/profile" title="Your Profile">
                        <UserCircleIcon className="w-6 h-6 mt-2"/>
                    </Link>
                    <button className="align-bottom flex-none inline bg-transparent text-black hover:text-white" onClick={signOut} title="Sign out">
                        <ArrowRightOnRectangleIcon className="w-6 h-6"/>
                    </button>
                </nav>
            </div>     
        </header>
    )
}

export default Header;