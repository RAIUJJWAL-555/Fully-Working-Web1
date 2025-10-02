import React from 'react'

const Facilities = () => {
  return (
    <div className='py-20 bg-gray-100'>
      <div className='mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center mb-12 text-blue-950'>Our Facilities</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-white p-6 rounded-xl shadow-lg text-center'>
            <i className="ri-wifi-fill text-blue-600 text-3xl mb-4"></i>
            <h3 className='text-xl font-semibold mb-2'>Free Wifi</h3>
            <p className='text-gray-600'>
              Stay connected with our reliable high-speed internet across the campus.
            </p>

          </div>
          <div className='bg-white p-6 rounded-xl shadow-lg text-center'>
            <i className="ri-restaurant-2-fill text-blue-600 text-3xl mb-4"></i>
            <h3 className='text-xl font-semibold mb-2'>Nutrious Food </h3>
            <p className='text-gray-600'>
              Enjoy nutritious and delicious meals in our spacious dining hall
            </p>

          </div>
          <div className='bg-white p-6 rounded-xl shadow-lg text-center'>
            <i className="ri-secure-payment-fill text-blue-600 text-3xl mb-4"></i>
            <h3 className='text-xl font-semibold mb-2'>High Security</h3>
            <p className='text-gray-600'>
              CCTV surveillance and on-site security ensure your safety at all times
            </p>

          </div>
          <div className='bg-white p-6 rounded-xl shadow-lg text-center'>
            <i className="ri-store-3-line text-blue-600 text-3xl mb-4"></i>
            <h3 className='text-xl font-semibold mb-2'>Nearby Stores </h3>
            <p className='text-gray-600'>
              Stores at walking distance and even metro station are close.
            </p>

          </div>

        </div>

      </div>
      
    </div>
  )
}

export default Facilities
