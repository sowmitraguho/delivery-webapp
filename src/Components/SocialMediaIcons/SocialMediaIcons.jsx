// SocialIcons.jsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const SocialIcons = () => {
  const iconStyle = 'text-2xl text-white hover:text-blue-500 transition-all duration-300';

  return (
    <div className="flex gap-4 justify-center items-center p-4 rounded-md">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={iconStyle}>
        <FaFacebookF />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={iconStyle}>
        <FaTwitter />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={iconStyle}>
        <FaInstagram />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={iconStyle}>
        <FaLinkedinIn />
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={iconStyle}>
        <FaGithub />
      </a>
    </div>
  );
};

export default SocialIcons;
