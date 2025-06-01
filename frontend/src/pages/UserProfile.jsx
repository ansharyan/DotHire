import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdAttachment } from "react-icons/md";
import Jobs from "../components/Jobs/Jobs";
import Applications from "../components/Application/Applications";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function UserProfile() {
  
  const queryClient = useQueryClient();
  const {user} = queryClient.getQueryData(["authUser"]);

  const {data:appliedJobs, isLoading, isError, error} = useQuery({
    queryKey: ["appliedJobs", user?._id],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/application/getApplied/${user?._id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data.applications;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: 1,
  })

  return (
    <div className="flex flex-col w-2/3 mx-auto ">
      <div className="p-6 border-2 border-gray-300 rounded-lg shadow-md mt-10 gap-3">
        <div className="flex justify-between">
          <div className="flex h-full items-center gap-4">
            <div className="rounded-full overflow-auto w-30 h-30">
              <img src={user.profile.profilePhoto || "avatar-placeholder.png"}></img>
            </div>
            <div className="flex flex-col">
              <span>{user?.fullname} <div className="badge badge-accent">{user?.role === "employer" ? "Recruiter" : "Job-Seeker"}</div></span>
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

      {user?.role === "employee" && (
        <div className="mt-5 p-6">
            <h2 className="text-accent font-medium text-lg">Applied Jobs</h2>
            <div className="bg-gray-700 h-0.5 rounded-full mt-0.5"></div>
            {isLoading && <div className="text-center mt-4">Loading...</div>}
            {!isLoading && !isError && <Applications applications={appliedJobs} />}
      </div>
      )}
    </div>
  );
}
