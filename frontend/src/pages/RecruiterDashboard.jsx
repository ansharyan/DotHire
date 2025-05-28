import { Link } from 'react-router-dom'
import Jobs from '../components/Jobs/Jobs'
import React from 'react'

export default function RecruiterDashboard() {
  return (
    <div className='w-2/3 mx-auto'>
        <div>
            <h1 className='text-2xl font-bold text-center my-4 text-accent'>Recruiter Dashboard</h1>
            <p className='text-center mb-8'>Manage your job postings and applications</p>
        </div>
        <Link to="/admin/create-job"><div className='btn btn-accent w-full'>+ Create a New Job</div></Link>
        <h2 className='text-xl font-bold mt-6 text-neutral'>Jobs Posted</h2>
        <Jobs className={"mt-6"}/>
    </div>
  )
}
