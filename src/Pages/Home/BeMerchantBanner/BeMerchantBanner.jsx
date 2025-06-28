import React from 'react';
import locationMerchant from '../../../assets/location-merchant.png'

const BeMerchantBanner = () => {
    return (
        <div>
            <div className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373d] rounded-4xl min-h-96 px-16 my-16 py-16">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={locationMerchant}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold text-gray-100">Merchant and Customer Satisfaction is Our First Priority</h1>
                        <p className="py-6 text-gray-100 font-light">
                            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                        </p>
                        <button className="btn border-none shadow-none px-10 py-6 bg-[#caeb66] text-[#03373d] rounded-full font-bold text-lg hover:bg-blue-600 hover:text-gray-100 transition-colors duration-300">Become a Merchant</button>
                        <button className="btn btn-outline shadow-none px-10 py-6 border border-[#caeb66] text-[#caeb66] rounded-full font-bold text-lg ms-2 hover:text-gray-950 hover:border-none transition-colors duration-300">Earn with Profast Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchantBanner;