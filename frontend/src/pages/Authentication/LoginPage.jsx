import React from "react";

export default function LoginPage() {
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
    console.log("Form submitted:", form);
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
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
