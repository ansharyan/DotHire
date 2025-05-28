import React from 'react'
import Job from './Job.jsx'
import job from '../../utils/data/jobs.js'


export default function Jobs({className, jobs, role}) {
  jobs.map ((job) =>{
    job.createdAt = new Date(job.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  })
  return (
    <div className={'grid gap-4 ' + className}>
        {jobs?.length > 0 ? (
          jobs.map((job, index) => (
            <Job key={index} job={job} role={"employee"} />
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">No jobs available</div>
        )}
    </div>
  )
}
