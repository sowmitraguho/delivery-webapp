import React from 'react';

const ProcessCard = ({service}) => {
    return (
        <div className="card bg-base-200 shadow-md p-4">
            <div className="card-body items-center text-center">
              <div className="mb-4">{service.icon}</div>
              <h3 className="card-title text-lg font-semibold text-[#03373D] dark:text-green-200">{service.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-200">{service.description}</p>
            </div>
          </div>
    );
};

export default ProcessCard;