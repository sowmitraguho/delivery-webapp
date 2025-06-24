import React from 'react';
import logo from '../../assets/logo.png'

const ProLogo = () => {
    return (
        <div className='flex items-end'> 
            <img src={logo} alt="Company Logo" />
            <p className='text-2xl font-extrabold -ml-3'>ProFast</p>
        </div>
    );
};

export default ProLogo;