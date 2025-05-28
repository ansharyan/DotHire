import React from 'react'

export default function Application() {
    const application = {
        job:{
            title: "Software Engineer",
            company: "Tech Corp",
            location: "New York, NY",
            description: "Develop and maintain software applications.",
            salary: "$100,000 - $120,000"
        },
        status: "pending",
        createdAt:"2023-10-01T12:00:00Z",
    }
   const statusClasses = {
        pending: "badge badge-warning",
        accepted: "badge badge-success",
        rejected: "badge badge-error"
    };

    const statusClass = statusClasses[application.status] || "badge badge-neutral";   
  return (
    <div className='p-4 shadow-md mt-4 flex justify-between items-center w-full'>
        <h2>{application.job.title}</h2>
        <p>{application.job.company}</p>
        <span>{new Date(application.createdAt).toLocaleDateString()}</span>
        <span className={statusClass + " rounded-xl"}>{application.status}</span>
    </div>
  )
}
