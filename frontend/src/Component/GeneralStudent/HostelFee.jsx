import React from 'react'
import { hostelFeesdetail } from '../../assets/assest'

const HostelFee = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center  text-center px-5'>
      
      <div className='p-4'>
        <h1 className='text-xl md:text-3xl font-bold bg-[#0d0071] m-auto text-white p-2 rounded'>Hostel Fees Details</h1>
        <p className='font-semibold my-3' dangerouslySetInnerHTML={{__html:hostelFeesdetail}}></p>
      </div>
      <div>
        <table className='border border-gray-400' id='HostelTable'>
  <tr>
    <th colSpan="4" className='bg-red-900 text-white' >HOSTEL FEES DETAIL</th>
  </tr>
  <tr>
    <th colSpan="4" className='bg-blue-950 text-white'>FOR BOYS HOSTEL</th>
  </tr>
  <tr>
    <th>Category</th>
    <th>Room fees (per year)</th>
    <th>Mess fees (per month)</th>
    <th>Total (per year)</th>
  </tr>
  <tr>
    <td>Non reserved</td>
    <td>₹ 3,500</td>
    <td>₹ 3,500</td>
    <td>₹ 45,500</td>
  </tr>
  <tr>
    <td>OBC</td>
    <td>₹ 3,250</td>
    <td>₹ 3,200</td>
    <td>₹ 41,650</td>
  </tr>
  <tr>
    <td>SC/ST</td>
    <td>₹ 2,800</td>
    <td>₹ 2,700</td>
    <td>₹ 35,200</td>
  </tr>
  <tr>
    <th colSpan="4" className='bg-pink-950 text-white'>FOR GIRLS HOSTEL</th>
  </tr>
  <tr>
    <th>Category</th>
    <th>Room fees (per year)</th>
    <th>Mess fees (per month)</th>
    <th>Total (per year)</th>
  </tr>
  <tr>
    <td>Non reserved</td>
    <td>₹ 3,200</td>
    <td>₹ 3,500</td>
    <td>₹ 45,200</td>
  </tr>
  <tr>
    <td>OBC</td>
    <td>₹ 2,950</td>
    <td>₹ 3,200</td>
    <td>₹ 41,350</td>
  </tr>
  <tr>
    <td>SC/ST</td>
    <td>₹ 2,600</td>
    <td>₹ 2,700</td>
    <td>₹ 35,000</td>
  </tr>
</table>
      </div>
      
    </div>
  )
}

export default HostelFee
