import React from 'react'
import Filter from '../components/Filter/Filter.jsx';
import Jobs from '../components/Jobs/Jobs.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function JobsPage() {


  const {data:jobs,isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/job');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.jobs;
      } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error; // Re-throw the error to be handled by React Query
      }
    },
  });


  return (
    <div className='flex flex-col md:grid md:grid-cols-4 mx-15 md:flex-row'>
        <Filter className=""/>
        {isLoading ? <div className='mt-10'>Loading...</div> :
        <div className=' col-span-3'>
          <Jobs className={"md:grid-cols-2 xl:grid-cols-3 mt-10"} jobs={jobs}/>
        </div>}
    </div>
  )
}
