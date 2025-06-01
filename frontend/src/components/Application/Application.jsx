import React from 'react'

export default function Application({application}) {

  console.log(application);
  
   const statusClasses = {
        pending: "badge badge-warning",
        accepted: "badge badge-success",
        rejected: "badge badge-error"
    };

    const statusClass = statusClasses[application?.status] || "badge badge-neutral";   
  return (
    <div className='p-4 shadow-md mt-4 flex justify-between items-center w-full'>
        <h2>{application?.job?.title}</h2>
        <p>{application?.job?.company.name}</p>
        <span>{new Date(application?.createdAt).toLocaleDateString()}</span>
        <span className={statusClass + " rounded-xl"}>{application?.status}</span>
    </div>
  )
}
