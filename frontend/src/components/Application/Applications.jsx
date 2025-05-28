import React from 'react'
import Application from './Application'

export default function Applications() {
  return (
    <div>
        <div className='py-4 px-8 border-2 border-gray-300 rounded-lg shadow-md mt-4 flex justify-between items-center'>
        <h2>Title</h2>
        <p>Company</p>
        <span>Date</span>
        <span className="">Status</span>
        </div>

        <div className='p-4 border-2 border-gray-300 rounded-lg shadow-md mt-4 flex justify-between items-center  flex-col gap-3'>
            <Application />
        <Application />
        <Application />
        <Application />
        </div>
        
    </div>
  )
}
