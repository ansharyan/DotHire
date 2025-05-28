import React from "react";

export default function EditProfile() {
  const user = {
    fullname: "Arjun Mehta",
    email: "arjun@innovatech.com",
    phoneNumber: "+1-212-555-0199",
    password: "hashed_password_here", // hash this before saving
    role: "employer",
    company: {
      name: "Innovatech Solutions",
      website: "https://innovatech.com",
      logo: "/logos/innovatech.png",
      description:
        "A global leader in AI and software innovation, delivering top-tier enterprise solutions.",
      location: "New York, NY",
    }, // match company _id above
    profile: {
      bio: "Tech recruiter with a passion for connecting top talent to top companies.",
      resume: "",
      profilePhoto: "/profiles/arjun.png",
    },
  };

  const [form, setForm] = React.useState({
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profile:{
        bio: user.profile.bio,
        resume: user.profile.resume,
        profilePhoto: user.profile.profilePhoto,
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

  return (
    <div className="w-2/3 mx-auto">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend text-neutral text-lg">Edit Profile</legend>

        <div className="flex justify-center mb-4 ">
            <img src={form.profile.profilePhoto} className="max-h-40 max-w-40"></img>
        </div>

        <label className="label text-primary">Full Name</label>
        <input type="text" className="input w-full" placeholder="Name" value={form.fullname} onChange={handleChange} name="fullname"/>

        <label className="label text-primary">Bio</label>
        <input type="text" className="input w-full" placeholder="my-awesome-page" value={form.profile.bio} name="profile.bio" onChange={handleChange}/>

        <label className="label text-primary">Email</label>
        <input type="text" className="input w-full" placeholder="Email" value={form.email} name="email"/>

        <label className="label text-primary">Contact Number</label>
        <input type="number" className="input w-full" placeholder="Contact Number" value={form.phoneNumber} name="phoneNumber" onChange={handleChange}/>

        <label className="label text-primary">Resume URL</label>
        <input type="text" className="input w-full" placeholder="Resume URL" value={form.profile.resume} name="profile.resume" onChange={handleChange}/>
      </fieldset>
    </div>
  );
}
