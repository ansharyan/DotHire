import { useMutation, useQueryClient } from "@tanstack/react-query";
import { set } from "mongoose";
import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {

  const queryClient = useQueryClient();
  const {user} = queryClient.getQueryData(["authUser"]);
  const navigate = useNavigate();

  const [profilePhoto, setProfilePhoto] = React.useState(null);  

  const [form, setForm] = React.useState({
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profile:{
        bio: user.profile.bio,
        resume: user.profile.resume,
        profilePhoto: user.profile.profilePhoto ,
    }
  })


  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await fetch(`/api/user/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["authUser"]);
      alert("Profile updated successfully!");
      navigate("/profile");
    },
    onError: (error) => {
      alert(error.message);
    }
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.profile.profilePhoto = profilePhoto || form.profile.profilePhoto;
     mutate(form);
    setProfilePhoto(null); // Reset the profile photo after submission

    // Submit the form data to the server
  }

  return (
    <div className="w-2/3 mx-auto">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend text-neutral text-lg">Edit Profile</legend>

        <div className="flex justify-center mb-4 flex-col">
            <img src={profilePhoto || form.profile.profilePhoto || "avatar-placeholder.png"} className="max-h-40 max-w-40"></img>
            <label className="label text-primary mt-2">Upload New Image</label>
            <input type="file" name="profilePhoto" className=" cursor-pointer mt-1 border-1 p-1 rounded-sm" accept="image/*" onChange={handleImageChange}/>
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
      <div className="flex justify-end my-4">
        <button className="btn btn-accent" onClick={handleSubmit} disabled={isPending}>
          {isPending ? <div className="loading loading-dots"/> : "Update Profile"}
        </button>
      </div>
      {isError && <div className="text-red-500 text-center">{error.message}</div>}
    </div>
  );
}
