import React from 'react';

const PrimaryButton = ({handleButton, buttonText}) => {
    return (
        <button onClick={handleButton} className="btn max-w-sm border-none shadow-none bg-[#caeb66] text-[#03373d] rounded font-bold  hover:bg-[#03373d] hover:text-[#caeb66] transition-colors duration-300">{buttonText}</button>
    );
};

export default PrimaryButton;