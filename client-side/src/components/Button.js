import React from 'react'

const Button = ({text, onChange, type}) => {
  return (
    <button
    className= "border-2 border-black bg-[#050505] text-white flex justify-center px-[1%] h-fit py-[2%] w-[100%] rounded-[0.25rem]"
    onChange={onChange}
    type ={type}
    >
    {text}
    </button>
  )
}



export default Button
