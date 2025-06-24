import React from 'react';
import Banner from '../Banner/Banner';
import Process from '../Process/Process';
import OurServices from '../OurServices/OurServices';
import Clients from '../Clients/Clients';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Process/>
            <OurServices/>
            <Clients/>
        </div>
    );
};

export default Home;