import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'
import ProLogo from '../Components/ProLogo/ProLogo';

const AuthLayout = () => {
    return (
        <div>
            <div className="px-20">
                <ProLogo/>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={authImg}
                        className="flex-1 max-w-sm rounded-lg shadow-2xl"
                    />
                    <div className='flex-1'>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;