import React from 'react';
import { Link, NavLink } from 'react-router';
import ProLogo from '../../Components/ProLogo/ProLogo';
import LogOut from '../../Pages/Authentication/LogOut';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {

    const {user} = useAuth();


    const navItems = <>
        <li> <NavLink to="/">Home</NavLink> </li>
        <li> <NavLink to="/coverage">Coverage</NavLink> </li>
        <li> <NavLink to="/sendparcel">Send A Parcel</NavLink> </li>
        
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {navItems}
                        </ul>
                    </div>
                    <div className="btn btn-ghost text-xl">
                        <ProLogo/>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                       {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? <LogOut/> : <Link to="/login" className="btn border-none shadow-none bg-[#caeb66] text-[#03373d] rounded font-bold  hover:bg-[#03373d] hover:text-[#caeb66] transition-colors duration-300">Login</Link> }
                </div>
            </div>
        </div>
    );
};

export default Navbar;