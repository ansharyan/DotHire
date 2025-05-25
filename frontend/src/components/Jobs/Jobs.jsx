import React from 'react'
import Job from './Job.jsx'
import job from '../../utils/data/jobs.js'


export default function Jobs() {
  return (
    <div className='mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
        <Job {...job}/>
        <Job {...job}/>
        <Job {...job}/>
        <Job {...job}/>
        <Job {...job}/>
        <Job {...job}/>
        <Job {...job}/>
    </div>
  )
}
