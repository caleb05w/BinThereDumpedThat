import React from 'react'

function BinAlert( {binID, binType, binLocation}) {
  return (
    <div className=' px-[6%] py-[4%] m-[20%] w-1/3 mx-auto border-2 border-black rounded-lg'>
      <h1 className=" text-6xl font-bold text-center ">Full Bin.</h1>
      <h2 className=' text-gray-400 text-center'>A super cool catchphrase.</h2>

      <div className='mt-[30%] flex justify-between'>
        <p className=' text-gray-400'>Bin ID:</p>
        <p className='font-bold'>{binID}</p>
      </div>

      <div className='mt-[3%] flex justify-between '>
        <p className='text-gray-400'>Bin Type:</p>
        <p className='font-bold'>{binType}</p>
      </div>

      <div className='mt-[3%] flex justify-between'>
        <p className='text-gray-400'>Bin Location:</p>
        <p className='font-bold'>{binLocation}</p>
      </div>

      <div className='mt-[23%] flex justify-center'>
        <button className='px-[55%] py-[5%] bg-black font-bold text-white border-2 border-black rounded-md'>Continue</button>
      </div>

    </div>
  )
}

export default BinAlert
