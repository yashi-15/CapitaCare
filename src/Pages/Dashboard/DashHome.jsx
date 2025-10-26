import React from 'react'

const DashHome = () => {
  return (
    <div className='py-3 grid grid-cols-3 gap-3'>
      <div className='bg-white p-3 rounded-md'>
        <h2 className='text-gray-600 mb-3'>Balance</h2>
        <h3 className='text-3xl font-semibold'>Rs. 300000</h3>
      </div>
      <div className='bg-white p-3 rounded-md'>
        <h2 className='text-gray-600 mb-3'>Income</h2>
        <h3 className='text-3xl font-semibold'>Rs. 400000</h3>
      </div>
      <div className='bg-white p-3 rounded-md'>
        <h2 className='text-gray-600 mb-3'>Expense</h2>
        <h3 className='text-3xl font-semibold'>Rs. 100000</h3>
      </div>
    </div>
  )
}

export default DashHome
