import React from 'react';
import img1 from '../../../assets/live-tracking.png'
import img3 from '../../../assets/safe-delivery.png'
import img2 from '../../../assets/tiny-deliveryman.png'
import OfferCard from './OfferCard';

const Offers = () => {
    const offers = [
        {
            image: img1,
            title: "Live Parcel Tracking",
            description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
        },
        {
            image: img2,
            title: "100% Safe Delivery",
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
        },
        {
            image: img3,
            title: "24/7 Call Center Support",
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
        }
    ]
    return (
        <div className='mx-12 py-12'>
            <h2 className="text-3xl my-4 text-green-950 dark:text-gray-100">What We Offers</h2>
            <div className="grid grid-cols-1 gap-6">
            {
                offers.map((offer, index)=> <OfferCard key={index} offer={offer} />)
            }
            </div>
        </div>
    );
};

export default Offers;