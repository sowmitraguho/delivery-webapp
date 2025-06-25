import React from 'react';

const OfferCard = ({offer}) => {
    console.log(offer)
    return (
        <div className='card card-side flex items-start'>
            <img className='w-50' src={offer.image} />
            <div className='card-body'>
                <h2 className="card-title text-2xl text-green-950 dark:text-gray-100">{offer.title}</h2>
                <p className="text-gray-300">{offer.description}</p>
            </div>
        </div>
    );
};

export default OfferCard;