import React from 'react'
import Filter from '../components/Filter/Filter.jsx';
import Jobs from '../components/Jobs/Jobs.jsx';

export default function JobsPage() {
  return (
    <div className='flex flex-col md:grid md:grid-cols-4 mx-15 md:flex-row'>
        <Filter className=""/>
        <div className=' col-span-3'>
          <Jobs className={"md:grid-cols-2 xl:grid-cols-3 mt-10"} />
        </div>
    </div>
  )
}
