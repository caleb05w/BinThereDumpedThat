import React from "react";

const InputButton = ({ placeholder, onChange, button, value, type }) => {
  return (
    <div className="flex items-center border border-black rounded-[0.25rem] mt-[1%] px-3 py-2">
      <input
        className="flex-grow outline-none poppins-light text-lg"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
      />
      {button}
    </div>
  );
};

export default InputButton;
