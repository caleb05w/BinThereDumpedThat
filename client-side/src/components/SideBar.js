import React from 'react'
import Button from "../components/Button";


function SideBar({BinID, BinType, BinLocation, BinStatus, Image}) {
  return (
    <div className='border-2 border-black w-[25%] rounded-[0.5rem] px-[1%] py-[3%] min-h-[80lvh]'>
        <h1 className=' text-2xl poppins-bold'> BinID </h1>
        <p> {BinID} </p>
        <p>{BinStatus}<span>BinStatus</span></p>

        <div className='border-2 border-black w-[100%] min-h-[30%] m-auto rounded-[0.5rem] mt-[13%]'>
          {/* <img src={}></img> */}
        </div>

        <h1 className='text-xl poppins-semibold mt-[10%]'> Bin Information </h1>
        
        <div className='flex-col flex gap-2 mt-[5%]'>
          <div className='w-[100%] flex justify-between'>
            <p className='text-gray-400'> Bin ID </p>
            <p> {BinID} </p>
          </div>

          <div className=' w-[100%] flex justify-between'>
            <p className='text-gray-400'> Bin Type </p>
            <p> {BinType}<span> BinType </span> </p>
          </div>

          <div className='w-[100%] flex justify-between'>
            <p className='text-gray-400'> Bin Location </p>
            <p> {BinLocation} </p>
          </div>
        </div>

      <div className='abolsute'>
        <Button className='relative b-0' text='View More' />
      </div>

    </div>
  )
}

export default SideBar
