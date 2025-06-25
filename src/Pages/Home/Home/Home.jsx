import React from 'react';
import Banner from '../Banner/Banner';
import Process from '../Process/Process';
import OurServices from '../OurServices/OurServices';
import Clients from '../Clients/Clients';
import Offers from '../Offers/Offers';
import BeMerchantBanner from '../BeMerchantBanner/BeMerchantBanner';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Process/>
            <OurServices/>
            <Clients/>
            <Offers/>
            <hr className="border-t border-dashed border-#03373d my-4" />
            <BeMerchantBanner/>
        </div>
    );
};

export default Home;