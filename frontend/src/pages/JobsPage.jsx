import React, { useState } from 'react'
import Filter from '../components/Filter/Filter.jsx';
import Jobs from '../components/Jobs/Jobs.jsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function JobsPage() {

  const queryClient = useQueryClient();
  const {user} = queryClient.getQueryData(["authUser"]);
  const [filteredJobs, setfilteredJobs] = useState(null);
  
  let {data:jobs,isLoading } = useQuery({
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

if(user?.role=== "employer"){
    jobs = jobs?.filter(job => job?.created_by?._id === user?._id);
}

const handleFilter=  (filtered) =>{
  setfilteredJobs(filtered);
}
  
  

  return (
    <div className='flex flex-col md:grid md:grid-cols-4 mx-15 md:flex-row'>
        {user.role === "employee" && <Filter className="" jobs={jobs} sendData = {handleFilter} />}
        {isLoading ? <div className='mt-10'>Loading...</div> :
        <div className={user.role === "employee" ? "md:col-span-3" : "md:col-span-4 md:w-2/3 mx-auto"}>
          <Jobs className={"mt-10 " + (user?.role ==="employee" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")} jobs={filteredJobs || jobs}  />
        </div>}
    </div>
  )
}
