import React from 'react';
import brand1 from '../../../assets/brands/amazon.png'
import brand2 from '../../../assets/brands/amazon_vector.png'
import brand3 from '../../../assets/brands/casio.png'
import brand4 from '../../../assets/brands/moonstar.png'
import brand5 from '../../../assets/brands/randstad.png'
import brand6 from '../../../assets/brands/start.png'
import brand7 from '../../../assets/brands/start-people 1.png'

const ClientLogoSwiper = () => {
    return (
        <div className='py-12 bg-gray-100'>
            <marquee>
                <div className='flex items-center gap-12 '>
                    <img src={brand1} alt="Brand Logo" />
                    <img src={brand2} alt="Brand Logo" />
                    <img src={brand3} alt="Brand Logo" />
                    <img src={brand4} alt="Brand Logo" />
                    <img src={brand5} alt="Brand Logo" />
                    <img src={brand6} alt="Brand Logo" />
                    <img src={brand7} alt="Brand Logo" />
                </div>
            </marquee>
        </div>
    );
};

export default ClientLogoSwiper;