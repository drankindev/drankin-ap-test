import React from 'react';
import { Link } from "react-router-dom";
import { UserCircleIcon, PowerIcon } from '@heroicons/react/24/outline'

const Header = ({ signOut, user }) => {

    return(
        <header className="w-full fixed z-50 px-6 py-4 bg-slate-400">
            <div className="w-full justify-between items-center flex">
            <Link to="/"><span className="font-bebas text-4xl">Bloggaboudit<span className="text-red-700">!</span></span></Link>

            <nav className="flex gap-4">
                <Link className="block w-8 h-8 text-black hover:text-red-700 bg-white rounded-full" to={`/profile/${user.username}`} title="Your Profile"><UserCircleIcon/>
                </Link>
                <button className="block w-8 h-8 text-black hover:text-red-700 bg-white rounded-full" onClick={signOut} title="Log Off"><PowerIcon/></button>
            </nav>

            </div>
        </header>
    )
}

export default Header;