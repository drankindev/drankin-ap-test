import React from 'react';
import { Link } from "react-router-dom";
import { UserCircleIcon, PowerIcon } from '@heroicons/react/24/outline'

const Header = ({ signOut }) => {
    return(
        <header className="w-full fixed z-50 px-6 py-4 bg-slate-400 drop-shadow">
            <div className="w-full relative">
                <div className="float-left">          
                    <Link to="/" title="Home"><span className="font-bebas text-4xl">Bloggaboudit<span className="text-red-700">!</span></span></Link>
                </div>

                <nav className="float-right flex gap-4 mt-3">
                    <Link className="font-bold hover:text-red-700" to="/profile" title="Your Profile">
                        Profile
                    </Link>
                    <button className="font-bold hover:text-red-700" onClick={signOut} title="Sign out">
                        Sign out
                    </button>
                </nav>
            </div>     
        </header>
    )
}

export default Header;