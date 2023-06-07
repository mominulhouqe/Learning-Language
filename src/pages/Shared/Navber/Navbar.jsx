import React from 'react';
import { Link } from 'react-router-dom'
const Navbar = () => {

    

    const menuItems = <>

        <li> <Link to='/'>Home</Link> </li>
        <li> <Link to='/instructors'>Instructors</Link> </li>
        <li> <Link to='/class'>Classes</Link> </li>
        <li> <Link to='/dashboard'>Dashboard</Link> </li>
        <li> <Link to='/user'>user</Link> </li>
        <div className="space-x-2">
            <Link to='/login' className="btn">Login</Link>
            <Link to='/register' className="btn">Logout</Link>

        </div>

    </>

    return (
        <div>
            <div className="navbar bg-gray-800 text-white font-serif">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm  dropdown-content mt-3 p-2 shadow bg-gray-800 text-white font-serif rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">FluentJourney</a>
                </div>
                <div className="navbar-center hidden  lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItems}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;