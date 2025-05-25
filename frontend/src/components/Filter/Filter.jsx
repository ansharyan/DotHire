import React from "react";
import FilterCollapse from "./FilterCollapse";

export default function Filter() {


  return (
    <div
     className="m-4 flex flex-col md:border-2 mx-auto w-full md:w-4/5 p-4 rounded-sm  mt-15">

      <div className="md:block hidden">
        <h1 className="text-neutral font-bold">Filter Jobs</h1>
      </div>
      
      <div className="collapse md:hidden">
        <input type="checkbox" />
        <div className="btn btn-accent w-full collapse-title">Filter Jobs</div>
        <div className="collapse-content"><FilterCollapse/></div>
      </div>

      <div className="hidden md:block"><FilterCollapse/></div>
    </div>
  );
}
