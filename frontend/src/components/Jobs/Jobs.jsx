import React from 'react'
import Job from './Job.jsx'
import job from '../../utils/data/jobs.js'


export default function Jobs({className}) {
  return (
    <div className={'grid gap-4 ' + className}>
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
