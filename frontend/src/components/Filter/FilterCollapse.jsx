import { useQueryClient } from '@tanstack/react-query';
import React, { useRef } from 'react';

export default function FilterCollapse({ jobs, sendData }) {
  const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];
  const jobTypes = ["full-time","part-time","internship", "remote"];
  const experienceLevels = [0,1,2,3,4,5];

  const queryClient = useQueryClient();

  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedJobType, setSelectedJobType] = React.useState("");
  const [selectedExperienceLevel, setSelectedExperienceLevel] = React.useState("");

  const applyFilters = (loc, type, exp) => {
    const filtered = jobs.filter(job => {
      return (
        (loc ? job.location === loc : true) &&
        (type ? job.jobType === type : true) &&
        (exp ? job.experienceLevel <= exp : true)
      );
    });
    sendData(filtered);
  };

  const handleLocationChange = (location) => {
    const newLoc = selectedLocation === location ? "" : location;
    setSelectedLocation(newLoc);
    applyFilters(newLoc, selectedJobType, selectedExperienceLevel);
  };

  const handleJobTypeChange = (jobType) => {
    const newType = selectedJobType === jobType ? "" : jobType;
    setSelectedJobType(newType);
    applyFilters(selectedLocation, newType, selectedExperienceLevel);
  };

  const handleExperienceLevelChange = (experienceLevel) => {
    const newExp = selectedExperienceLevel === experienceLevel ? "" : experienceLevel;
    setSelectedExperienceLevel(newExp);
    applyFilters(selectedLocation, selectedJobType, newExp);
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="divider my-0"></div>

        {/* Location Filter */}
        <div>
          <span className="text-neutral">Location</span>
          <ul className="mt-1">
            {locations.map((location, index) => (
              <li key={index}>
                <label className="cursor-pointer label text-sm text-neutral-700 gap-2">
                  <input
                    type="radio"
                    className="radio radio-xs"
                    name="location"
                    readOnly
                    onClick={() => handleLocationChange(location)}
                    checked={selectedLocation === location}
                  />
                  <span className="label-text">{location}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Job Type Filter */}
        <div>
          <span className="text-neutral">Job Type</span>
          <ul className="mt-1">
            {jobTypes.map((jobType, index) => (
              <li key={index}>
                <label className="cursor-pointer label text-sm text-neutral-700 gap-2">
                  <input
                    type="radio"
                    className="radio radio-xs"
                    name="jobType"
                    readOnly
                    onClick={() => handleJobTypeChange(jobType)}
                    checked={selectedJobType === jobType}
                  />
                  <span className="label-text">{jobType.toUpperCase()}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Experience Level Filter */}
        <div>
          <span className="text-neutral">Experience Level</span>
          <ul className="mt-1">
            {experienceLevels.map((experienceLevel, index) => (
              <li key={index}>
                <label className="cursor-pointer label text-sm text-neutral-700 gap-2">
                  <input
                    type="radio"
                    className="radio radio-xs"
                    name="experienceLevel"
                    readOnly
                    onClick={() => handleExperienceLevelChange(experienceLevel)}
                    checked={selectedExperienceLevel === experienceLevel}
                  />
                  <span className="label-text">{experienceLevel + "years+"}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
