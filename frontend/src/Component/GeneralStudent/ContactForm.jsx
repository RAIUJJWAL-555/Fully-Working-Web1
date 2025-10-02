import React from 'react';

const ContactForm = () => {
  return (
    <div>
      <div className='w-full p-8 bg-white/20 backdrop-blur-lg rounded-xl shadow-xl border border-white/30'>
        <form>
          {/* Subject Select */}
          <div className='mb-3'>
            <select
              name="subject"
              defaultValue=""
              className='w-full p-2 bg-white/30 border border-white/50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200'
            >
              <option value="" disabled>Select a subject</option>
              <option value="hostel-query">Hostel Query</option>
              <option value="complaints">Complaints</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Full Name */}
          <div className='mb-4'>
            <input
              type="text"
              placeholder='Enter your full name'
              className='w-full p-3 bg-white/30 border border-white/50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200'
            />
          </div>

          {/* Phone Number */}
          <div className='mb-4'>
            <input
              type="tel"
              placeholder='Enter your phone number'
              className='w-full p-3 bg-white/30 border border-white/50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200'
            />
          </div>

          {/* Email */}
          <div className='mb-4'>
            <input
              type="email"
              placeholder='Enter your email'
              className='w-full p-3 bg-white/30 border border-white/50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200'
            />
          </div>

          {/* Description */}
          <div className='mb-4'>
            <textarea
              name="description"
              placeholder='Describe your query or issue'
              className='w-full p-3 bg-white/30 border border-white/50 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200'
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className='mb-4'>
            <button
              type='submit'
              className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
