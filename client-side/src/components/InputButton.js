import React from 'react'

const InputButton = ({placeholder, onChange, value, type}) => { 
  return (
    <input
      className="border-2 border-black w-[100%] py-[2%] rounded-[0.25rem] px-[1.5%] mt-[1%]"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
    />
  );
}

export default InputButton
