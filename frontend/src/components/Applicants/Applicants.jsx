import React from 'react'
import Applicant from './Applicant'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function Applicants() {
  const {jobId} = useParams();
  // Fetch job details using jobId if needed
  const {data:applications, isLoading, isError, error} = useQuery({
    queryKey: ['applicants', jobId],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/application/getApplicants/${jobId}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong!');
        }
        return data.applications;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: 1,
  })
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
          {isLoading && <div className="text-center text-gray-500 mt-10">Loading applicants...</div>}
          {!isLoading &&
            (applications?.length > 0 ? (
              applications.map((application, index) => (
                <Applicant key={index} applicant={application.applicant} application={application}/>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-10">No applicants available</div>
            ))
          }
         
        </div>
    </div>
  )
}
