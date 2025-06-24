// Process.jsx
import React from 'react';
import { FaShippingFast, FaMoneyBillWave, FaWarehouse, FaBriefcase } from 'react-icons/fa';
import ProcessCard from './ProcessCard';

const Process = () => {


      const services = [
        {
          title: 'Booking Pick & Drop',
          description: 'From personal packages to business shipments — we deliver on time, every time.',
          icon: <FaShippingFast className="text-4xl text-primary" />,
        },
        {
          title: 'Cash On Delivery',
          description: 'From personal packages to business shipments — we deliver on time, every time.',
          icon: <FaMoneyBillWave className="text-4xl text-primary" />,
        },
        {
          title: 'Delivery Hub',
          description: 'From personal packages to business shipments — we deliver on time, every time.',
          icon: <FaWarehouse className="text-4xl text-primary" />,
        },
        {
          title: 'Booking SME & Corporate',
          description: 'From personal packages to business shipments — we deliver on time, every time.',
          icon: <FaBriefcase className="text-4xl text-primary" />,
        },
      ];


    return (
        <div className="py-12 px-4 bg-base-100">
            <h2 className="text-3xl font-bold text-center mb-10 text-[#03373D] dark:text-green-200">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <ProcessCard key={index} service={service} />
                ))}
            </div>
        </div>
    );
};

export default Process;
