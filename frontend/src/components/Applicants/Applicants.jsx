import React from 'react'
import Applicant from './Applicant'

export default function Applicants() {
  return (
    <div className='w-2/3 mx-auto'>
      <div className='py-2 px-8 border-2 border-gray-300 rounded-lg mt-4 flex justify-between items-center'>
        <h2>Name</h2>
        <p>Email</p>
        <span>Contact</span>
        <span className="">Resume</span>
        <span className="rounded-xl">Action</span>
        </div>
        
        <div className='p-2 border-2 border-gray-300 rounded-lg shadow-md mt-2 flex justify-between items-center  flex-col gap-3'>
          <Applicant />
          <div className='divider my-0'></div>
          <Applicant />  
        </div>
    </div>
  )
}
