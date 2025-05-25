import React from 'react'

export default function FilterCollapse() {
  const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];
  const jobTypes = ["Onsite", "Remote"];
  const experienceLevels = ["Fresher", "1-3 years", "3-5 years", "5+ years"];

  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedJobType, setSelectedJobType] = React.useState("");
  const [selectedExperienceLevel, setSelectedExperienceLevel] = React.useState("");

  const handleRadioChange = (location) => {
    if (selectedLocation === location) {
      setSelectedLocation("");
    } else {
      setSelectedLocation(location);
    }
  };
  const handleJobTypeChange = (jobType) => {
    if (selectedJobType === jobType) {
      setSelectedJobType("");
    } else {
      setSelectedJobType(jobType);
    }
  };

  const handleExperienceLevelChange = (experienceLevel) => {
    if (selectedExperienceLevel === experienceLevel) {
      setSelectedExperienceLevel("");
    } else {
      setSelectedExperienceLevel(experienceLevel);
    }
  };

  return (
    <div className=''>
        <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col">
          <div className="divider my-0"></div>
        </div>
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
                    onClick={() => {
                      handleRadioChange(location);
                    }}
                    checked={selectedLocation === location}
                  />
                  <span className="label-text">{location}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* jobType */}
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
                    onClick={() => {
                      handleJobTypeChange(jobType);
                    }}
                    checked={selectedJobType === jobType}
                  />
                  <span className="label-text">{jobType}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        
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
                    onClick={() => {
                      handleExperienceLevelChange(experienceLevel);
                    }}
                    checked={selectedExperienceLevel === experienceLevel}
                  />
                  <span className="label-text">{experienceLevel}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
