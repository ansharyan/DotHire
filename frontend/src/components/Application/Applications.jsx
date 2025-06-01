import React from 'react'
import Application from './Application'

export default function Applications({applications}) {
  return (
    <div>
        <div className='py-4 px-8 border-2 border-gray-300 rounded-lg shadow-md mt-4 flex justify-between items-center'>
        <h2>Title</h2>
        <p>Company</p>
        <span>Date</span>
        <span className="">Status</span>
        </div>

        <div className='p-4 border-2 border-gray-300 rounded-lg shadow-md mt-4 flex justify-between items-center  flex-col gap-3'>
            {applications?.length > 0 ? (
                applications.map((application) => (
                    <Application key={application._id} application={application} />
                ))
            ) : (
                <div className='text-center text-gray-500'>No applications found</div>
            )}
        </div>
        
    </div>
  )
}
