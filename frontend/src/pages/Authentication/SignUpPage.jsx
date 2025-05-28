import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {

  const navigate = useNavigate();

  const {mutate: signup, isPending, error, isError } = useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await fetch('/api/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Signup failed. Please try again.');
        }
        return data;
      } catch (error) {
        console.error('Error during signup:', error);
        throw error; // Re-throw the error to be handled by React Query
      }
    },
    onSuccess: (data) => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  })

  const [form, setForm] = React.useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password:"",
    role: "",
    profile:{
        bio: "",
        resume: "",
        profilePhoto: "",
    }
    
  })
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Support dot notation: 'profile.bio'
    const keys = name.split(".");
    setForm(prev => {
      const updated = { ...prev };
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(form);
  }

  return (
    <div className="w-2/3 mx-auto">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend text-neutral text-lg">SignUp</legend>

        <label className="label text-primary">Full Name</label>
        <input type="text" className="input w-full" placeholder="Name" value={form.fullname} onChange={handleChange} name="fullname"/>

        <label className="label text-primary">Bio</label>
        <input type="text" className="input w-full" placeholder="my-awesome-page" value={form.profile.bio} name="profile.bio" onChange={handleChange}/>

        <label className="label text-primary">Email</label>
        <input type="email" className="input w-full" placeholder="Email" value={form.email} name="email" onChange={handleChange}/>

        <label className="label text-primary">Password</label>
        <input type="password" className="input w-full" placeholder="Password" value={form.password} name="password" onChange={handleChange}/>

        <label className="label text-primary">Contact Number</label>
        <input type="number" className="input w-full" placeholder="Contact Number" value={form.phoneNumber} name="phoneNumber" onChange={handleChange}/>

        <label className="label text-primary">Resume URL</label>
        <input type="text" className="input w-full" placeholder="Resume URL" value={form.profile.resume} name="profile.resume" onChange={handleChange}/>

        <select className="select select-bordered w-full text-primary mt-4" name="role" onChange={handleChange}>
          <option value="" disabled selected>Select Role</option>
          <option value="employee">Job Seeker</option>
          <option value="employer">Recruiter</option>
        </select>
      </fieldset>
      <div className="flex justify-center mt-4">
        <button className="btn btn-primary w-full" onClick={handleSubmit}>Sign Up</button>
      </div>
      <div className='mt-2 mb-6'>
        <p>Already have an account?</p>
        <Link to="/login" className="btn btn-neutral p-4 py-2">Login</Link>
      </div>
    </div>
  )
}
