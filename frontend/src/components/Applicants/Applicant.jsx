import React from 'react'
import { Link } from 'react-router-dom'
import { IoEyeSharp } from "react-icons/io5";

export default function Applicant() {
    const application = {
        applicant:{
            name: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "123-456-7890",
            bio:{
                resume: "https://example.com/resume.pdf",
            }
        }
    }
  return (
    <div className='p-2 flex justify-between items-center w-full'>
        <h2>{application.applicant.name}</h2>
        <p>{application.applicant.email}</p>
        <span>{application.applicant.phoneNumber}</span>
        <Link to={application.applicant.bio.resume} className=" rounded-xl text-primary flex items-center"><IoEyeSharp /> <span> View Resume</span></Link>
        <div>
            <select className="select select-bordered w-full max-w-xs">
                <option selected>Action</option>
                <option>Accept</option>
                <option>Reject</option>
            </select>
        </div>
    </div>
  )
}
