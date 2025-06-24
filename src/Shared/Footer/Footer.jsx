import React from 'react';
import ProLogo from '../../Components/ProLogo/ProLogo';
import SocialIcons from '../../Components/SocialMediaIcons/SocialMediaIcons';
import { NavLink } from 'react-router';


const Footer = () => {
    const navItems = <>
        <li> <NavLink to="/">Home</NavLink> </li>
        <li> <NavLink to="/">Home</NavLink> </li>
        <li> <NavLink to="/">Home</NavLink> </li>
    </>
    return (
        <div>
            <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content p-10">
                <aside>
                    <ProLogo/>
                    <p className="max-w-md">
                       Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>
                    <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-4 px-1 mt-4">
                       {navItems}
                    </ul>
                </div>
                </aside>
                <nav>
                    <div className="">
                       <SocialIcons/>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;