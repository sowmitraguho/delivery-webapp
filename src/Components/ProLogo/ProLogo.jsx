import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';


const ProLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img src={logo} alt="Company Logo" />
                <p className='text-2xl font-extrabold -ml-3'>ProFast</p>
            </div>
        </Link>
    )
};

export default ProLogo;