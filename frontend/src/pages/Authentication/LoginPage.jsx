import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function LoginPage() {
  
  const {mutate, isPending, error, isError}  = useMutation({
    mutationKey: ["login"],
    mutationFn: async (formData) => {
      try {
        
        const response = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error( data.error || "Login failed. Please try again.");
        }
        
        return data;
      } catch (error) {
        console.error("Error logging in:", error);
        throw error; // Re-throw the error to be handled by React Query
      }
    },
    onSuccess:(data) => {
      alert("Login successful!");
      Navigate("/jobs");
    }
  });



  const [form, setForm] = React.useState({
    email: "",
    password: "",
    role: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
    if(isError){
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    }
  };
  return (
    <div>
      <div className="w-2/3 mx-auto">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
          <legend className="fieldset-legend text-neutral text-lg">
            SignUp
          </legend>

          <label className="label text-primary">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            value={form.email}
            name="email"
            onChange={handleChange}
            required
          />

          <label className="label text-primary">Paswsword</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            name="password"
            required
          />

          <div className="grid grid-cols-2">
            <select
              className="select select-bordered w-full text-primary"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="employer">Employer</option>
              <option value="employee">Employee</option>
            </select>

            <div className=" items-center w-full flex justify-end gap-1"><p>Do not have an account?</p> <Link to={"/signup"} className="btn btn-ghost btn-neutral  p-2">Sign Up</Link></div>

          </div>
          
        </fieldset>
        <div className="flex justify-center mt-4">
          <button className="btn btn-accent w-full" onClick={handleSubmit}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
