import React from 'react'
import gpg_hd_2 from '../../assets/gpg_hd_2.jpeg'
import gpg_hd from '../../assets/gpg_hd_img.jpeg'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className='relative h-[50vh] w-full md:h-[300px] lg:h-[400px]'>
      <img src={gpg_hd_2} alt="" className='w-full h-full object-cover' />
      <div className='absolute inset-0 bg-black/50'></div>
      <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
        <h1 className='text-white text-2xl md:text-3xl font-bold'>Welcome to GPG Hostel</h1>
        <p className='text-sm md:text-lg'>A place to share memories, achievements and moments of sheer love</p>
        <Link to='/register/student' href="" className='my-2 bg-red-600 py-2 px-4 rounded cursor-pointer '>Apply For Hostel</Link>

      </div>

      
    </div>
  )
}

export default Welcome
