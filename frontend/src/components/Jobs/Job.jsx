import React from "react";
import { Link } from "react-router-dom";
import HandleApply from "../../utils/hooks/HandleApply";
import { useQueryClient } from "@tanstack/react-query";

export default function Job({ job, role }) {
  const queryClient = useQueryClient();

  const { user } = queryClient.getQueryData(["authUser"]);
  role = user?.role || "employee"; // Fallback to passed role if user role is not available
  const { applyJob, isApplying } = HandleApply();

  let applied = false;
  let status = "Not Applied";
  let application = job?.applications.map((application) => {
    if (application.applicant === user._id) {
      applied = true; 
      status = application.status;    
      return application;
    }
  });

  const handleApply = (e) => {
    e.preventDefault();
    // Logic to handle job application
    applyJob({ jobId: job._id, applicantId: user._id });
  };

  return (
    <div className="">
      <div
        href="#"
        className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6"
      >
        <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
          <div className="sm:order-last sm:shrink-0">
            <img
              alt=""
              src={job?.company?.logo || "https://via.placeholder.com/72"}
              className="size-16 rounded-full object-cover sm:size-[72px]"
            />
          </div>

          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg font-medium text-pretty text-gray-900">
              {job?.title}
            </h3>
            <p className="mt-1 text-sm text-gray-700">{job?.company.name}</p>
            <p className="mt-4  text-sm text-pretty text-gray-700">
              {job?.description}
            </p>
          </div>
        </div>
        <div className="flex gap-1 mt-2">
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-sm whitespace-nowrap text-accent">
            {job?.position} Positions
          </span>
          <span className="rounded-full bg-neutral/10 px-2.5 py-0.5 text-sm whitespace-nowrap text-neutral">
            {job?.jobType}
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm whitespace-nowrap text-primary">
            {job?.salary / 10000} LPA{" "}
          </span>
        </div>

        <div className="collapse mt-5">
          <input type="checkbox" className="peer" />
          <div className="btn btn-neutral collapse-title">Details</div>
          <div className="collapse-content mt-3">
            <ul className="list-disc pl-5">
              <li className="text-sm text-gray-700">
                Location: {job?.location}
              </li>
              <li className="text-sm text-gray-700">
                Experience Level: {job?.experienceLevel}
              </li>
              <li className="text-sm text-gray-700">Requirements:</li>
              <ul className="list-disc pl-5">
                {job?.requirements.map((req, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {req}
                  </li>
                ))}
              </ul>
            </ul>
            <div className="flex justify-between items-center mt-4">
              {role === "employer" ? (
                <div className="flex gap-2">
                  {" "}
                  <div className="btn btn-accent">Edit</div>{" "}
                  <Link
                    to="/admin/applicants"
                    className="btn btn-ghost btn-neutral"
                  >
                    View Applicants
                  </Link>
                </div>
              ) : (
                <div
                  className="btn btn-ghost btn-accent font-bold -ml-4"
                  onClick={handleApply} disabled={applied || isApplying}
                >
                  {applied ? "Applied":isApplying ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Apply"
                  ) }
                </div>
              )}
              {role === "employer" ? (
                <div className="btn btn-error -ml-4">Delete</div>
              ) : (
                <div className={`badge badge-neutral`}>{status}</div>
              )}
            </div>
          </div>
        </div>

        <dl className="mt-6 flex gap-4 lg:gap-6">
          <div className="flex items-center gap-2">
            <dt className="text-gray-700">
              <span className="sr-only"> Published on </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
            </dt>

            <dd className="text-xs text-gray-700">{job?.createdAt}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
