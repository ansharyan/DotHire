import React from 'react'
import Filter from '../components/Filter/Filter.jsx';

export default function JobsPage() {
  return (
    <div className='flex flex-col md:grid md:grid-cols-4 mx-15 md:flex-row'>
        <Filter/>
    </div>
  )
}
