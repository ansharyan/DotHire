import React from 'react'
import { Link } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5";
import {useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';

export default function Applicant({applicant, application}) {

  const{mutate, isPending, error, isError} = useMutation({
    mutationFn: async (status) => {
      const response = await fetch(`/api/application/update/${application._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast.success("Application updated successfully:", data.message);
    },
    onError: (error) => {
      toast.error("Error updating application:", error);
    },
  })

  const handleChange = (e) =>{
    const selectedOption = e.target.value;
    mutate({ status: selectedOption });
  }
  return (
    <div className='p-2 flex justify-between items-center w-full'>
        <h2>{applicant.fullname}</h2>
        <p>{applicant.email}</p>
        <span>{applicant.phoneNumber}</span>
        <a href={applicant.profile.resume || ""} target='_blank' className=" rounded-xl text-primary flex items-center"><IoEyeSharp /> <span> View Resume</span></a>
        <div>
            <select className="select select-bordered w-full max-w-xs" onChange={handleChange}>
                <option selected={application.status === "pending"} value="pending">Action</option>
                <option selected={application.status === "accepted"} value="accepted">Accept</option>
                <option selected={application.status === "rejected"} value="rejected">Reject</option>
            </select>
        </div>
    </div>
  )
}
