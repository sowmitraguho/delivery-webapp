import React from 'react';

const ServiceCard = ({service}) => {
    return (
        <div className="card bg-white transition-colors duration-300 hover:bg-[#CAEB66] dark:bg-gray-950 dark:hover:bg-gray-800 text-center shadow-md p-6 ">
              <div className="flex justify-center mb-4 ">{service.icon}</div>
              <h3 className="card-title justify-center text-lg font-semibold text-[#03373D] dark:text-green-200">{service.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-200">{service.description}</p>
            </div>
    );
};

export default ServiceCard;