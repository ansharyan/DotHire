import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className='flex flex-col items-center justify-center my-auto gap-9'>
        <div className='flex flex-col items-center justify-center text-center space-y-4'>
            <h1 className='text-7xl text-neutral'>Welcome to DotHire</h1>
            <h2 className='text-5xl text-secondary'>Discover your next great oppurtunity.</h2>
        </div>
        <div className='flex gap-4'>
            <button className='text-3xl btn btn-neutral p-6 font-bold' ><Link to="/jobs">Browse Jobs</Link></button>
            <Link to={"/admin/create-job"} className='text-3xl btn btn-accent p-6'>Post a Job</Link>
        </div>
    </div>
  )
}
