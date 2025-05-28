import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdAttachment } from "react-icons/md";
import Jobs from "../components/Jobs/Jobs";
import Applications from "../components/Application/Applications";

export default function UserProfile() {
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

  return (
    <div className="flex flex-col w-2/3 mx-auto ">
      <div className="p-6 border-2 border-gray-300 rounded-lg shadow-md mt-10 gap-3">
        <div className="flex justify-between">
          <div className="flex h-full items-center gap-4">
            <div className="rounded-full overflow-auto w-30 h-30">
              <img src="logo.png"></img>
            </div>
            <div className="flex flex-col">
              <span>{user?.fullname}</span>
              <span>{user?.profile?.bio}</span>
            </div>
          </div>
          <div className=" cursor-pointer btn btn-primary"><Link to={"/edit-profile"}>Edit</Link></div>
        </div>

        <div className="flex flex-col mt-3">
          <div className="flex items-center gap-1">
            <MdOutlineEmail /> <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlinePhone /> <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-neutral font-medium ">Skills</h2>
          <div className="flex gap-2">
            <div className="badge badge-neutral rounded-xl ">SQL</div>
            <div className="badge badge-neutral rounded-xl ">MERN</div>
            <div className="badge badge-neutral rounded-xl ">NextJS</div>
          </div>
        </div>

        <div className="text-primary mt-2 font-medium flex gap-0.5 items-center">
            <MdAttachment/>
          <Link to={user?.profile.resume}>Resume</Link>
        </div>
      </div>

      <div className="mt-5 p-6">
            <h2 className="text-accent font-medium text-lg">Applied Jobs</h2>
            <div className="bg-gray-700 h-0.5 rounded-full mt-0.5"></div>
            <Applications/>
      </div>
    </div>
  );
}
