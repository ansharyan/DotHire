import React from 'react'

export default function CreateJob() {
    const [form, setForm] = React.useState({
        title: "",
        description: "",
        requirements: [],
        experienceLevel: 0,
        company: "",
        location: "",
        salary: "",
        jobType: "", 
        position: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }
  return (
    <div className='w-2/3 mx-auto mt-5 border-2 border-base-300 rounded-box p-4 flex flex-col'>
        <h1>Create Job</h1>
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
                <select className='select w-full' value={form.company} onChange={handleChange} name="company">
                    <option value="">Select Company</option>
                    <option value="Google">Google</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Company C">Company C</option>
                </select>
            </div>
            <div>
                <label className='label text-primary'>Location</label>
                <input type="text" className='input w-full' placeholder='Job Location' value={form.location} onChange={handleChange} name="location"/>
            </div>
            <div>
                <label className='label text-primary'>Salary</label>
                <input type="text" className='input w-full' placeholder='Salary Range' value={form.salary} onChange={handleChange} name="salary"/>
            </div>
            <div className='col-span-2'>
                <label className='label text-primary'>Job Type</label>
                <select className='select w-full' value={form.jobType} onChange={handleChange} name="jobType">
                    <option value="">Select Job Type</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="internship">Internship</option>
                </select>
            </div>
            <div>
                <label className='label text-primary'>Position</label>
                <input type="number" className='input w-full' placeholder='Number of Positions' value={form.position} onChange={handleChange} name="position"/>
            </div>
        </div>
        <div className='flex w-full flex-row-reverse mr-4'><div className='btn btn-accent mt-4 w-fit justify-self-end'>Create Job</div></div>
    </div>
  )
}
