import React from 'react';
import { Link, Outlet } from 'react-router';
import authImg from '../assets/authImage.png'
import ProLogo from '../Components/ProLogo/ProLogo';
import PrimaryButton from '../Components/PrimaryButton/PrimaryButton';

const AuthLayout = () => {
    return (
        <div>
            <div className="px-20 py-4">
                <div className="flex justify-between items-center">
                    <ProLogo/>
                    <Link to='/'><PrimaryButton buttonText='Back To Home' /></Link>
                </div>
                <div className="hero-content flex-col lg:flex-row-reverse items-center justify-center min-h-[90vh]">
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