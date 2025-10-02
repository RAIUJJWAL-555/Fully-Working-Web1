import React from 'react'

const NotificationBanner = () => {
  return (
    <div>
      <div className='bg-orange-200 '>
        <marquee behavior="scroll" direction="left">
          <p className='font-bold text-sm lg:text-lg'><span className='text-red-600'>Notification: </span>Student registration will closed on 12th october</p>
        </marquee>
      </div>
      
    </div>
  )
}

export default NotificationBanner
