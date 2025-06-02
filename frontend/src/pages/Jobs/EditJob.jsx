import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import toast from 'react-hot-toast';

export default function EditJob({job}) {
    const queryClient = useQueryClient();
    const {user} = queryClient.getQueryData(['authUser']) || {};
    const navigate = useNavigate();
    if(user?.role !== 'employer'){
        return (
            <div className='text-center'><p className='text-error'>You are Not Authorized!</p> 
            <p className='text-alert'>Please Sign In as Recruiter!</p>
            </div>
        )
    }

    const{mutate, isPending, isError, error} = useMutation({
        mutationFn: async (form) => {
            const response = await fetch(`/api/job/edit/${job._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to create job');  
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs']);
            toast.success('Job updated successfully!');
            navigate('/jobs');
        },
        onError: (error) => {
            toast.error('Failed to update job: ' + error.message);
        },
    })

    const [form, setForm] = React.useState({
        title: job?.title,
        description: job?.description,
        requirements: job?.requirements || [],
        experienceLevel: job?.experienceLevel || 0,
        company: job?.company.name || "",
        location: job?.location || "",
        salary: job?.salary || "",
        jobType: job?.jobType || "", 
        position: job?.position || 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isPending) return;
        mutate(form);
    }


  return (
    <div className='w-full mx-auto rounded-box p-4 flex flex-col'>
        <h1 className='text-neutral text-lg'>Edit Job</h1>
        <div className='flex flex-col gap-3'>
            <label className='label text-primary'>Job Title</label>
            <input type="text" className='input w-full' placeholder='Job Title' value={form.title} onChange={handleChange} name="title" />

            <label className='label text-primary'>Description</label>
            <textarea className='textarea w-full' placeholder='Job Description' value={form.description} onChange={handleChange} name="description"></textarea>

            <label className='label text-primary'>Requirements</label>
            <input type="text" className='input w-full' placeholder='Requirements (comma separated)' value={form.requirements.join(', ')} onChange={(e) => setForm(prev => ({ ...prev, requirements: e.target.value.split(',').map(req => req.trim()) }))} name="requirements" />
        </div>

        <div className=' grid grid-cols-3 gap-3 mt-4'>
            <div>
                <label className='label text-primary'>Experience Level</label>
                <input type="number" className='input w-full' placeholder='Experience Level in yrs+' value={form.experienceLevel} onChange={handleChange} name="experienceLevel"/>
            </div>
            <div>
                <label className='label text-primary'>Company</label>
                <select className='select w-full' value={form.company} name="company">
                    <option value="">Select Company</option>
                    <option value="Google">Google</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Meta">Meta</option>
                    <option value="Netflix">Netflix</option>
                </select>
            </div>
            <div>
                <label className='label text-primary'>Location</label>
                <input type="text" className='input w-full' placeholder='Job Location' value={form.location} onChange={handleChange} name="location"/>
            </div>
            <div>
                <label className='label text-primary'>Salary (Annual)</label>
                <input type="text" className='input w-full' placeholder='Salary Range' value={form.salary} onChange={handleChange} name="salary"/>
            </div>
            <div className='col-span-2'>
                <label className='label text-primary'>Job Type</label>
                <select className='select w-full' value={form.jobType} onChange={handleChange} name="jobType">
                    <option value="">Select Job Type</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                </select>
            </div>
            <div>
                <label className='label text-primary'>Position</label>
                <input type="number" className='input w-full' placeholder='Number of Positions' value={form.position} onChange={handleChange} name="position"/>
            </div>
        </div>
        <div className='flex w-full flex-row-reverse mr-4'><div className='btn btn-accent mt-4 w-fit justify-self-end' onClick={handleSubmit}>{isPending ? (<div className="loading loading-dots"></div>) : "Edit Job"}</div></div>
    </div>
  )
}
