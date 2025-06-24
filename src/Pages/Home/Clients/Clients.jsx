import React from 'react';
import ClientLogoSwiper from './ClientLogoSwiper';

const Clients = () => {
    return (
        <div className='my-12'>
            <h2 className="text-xl font-semibold text-green-950 dark:text-gray-100 text-center mb-2">We've helped thousands of sales teams</h2>
            <ClientLogoSwiper/>
        </div>
    );
};

export default Clients;