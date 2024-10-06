import React from 'react'

const Button = ({ text, className, onClick, onChange, type, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-black bg-[#050505] items-center gap-2 poppins-semibold text-white flex justify-center px-6 h-max py-2.5 w-[100%] rounded-lg ${
        className && className
      }`}
      onChange={onChange}
      type={type}
    >
      {text}
      {icon && icon}
    </button>
  );
};



export default Button
