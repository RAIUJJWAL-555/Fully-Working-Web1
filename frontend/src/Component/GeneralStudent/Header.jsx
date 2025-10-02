import React from 'react'
import NotificationBanner from './NotificationBanner'
import gpg_logo_no_bg from '../../assets/gpg_logo_no_bg.png'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='border-b-4'>
      <NotificationBanner/>
      <div className='w-full bg-[#1F2A44] text-white flex flex-row justify-between  items-center p-2 '>
        <div className='flex items-center p-3'>
          <img src={gpg_logo_no_bg} alt="" className='w-20 md:w-28 '/>
        <h1 className='px-4 text-[15px]  md:text-lg lg:text-xl  font-bold'>Government Polytechnic Ghaziabad Hostel <span className='block font-medium md:text-center text-sm italic '>(Aicte registered, 1998 established)</span></h1>
        </div>
        <Navbar/>
      </div>
      
    </div>
  )
}

export default Header
