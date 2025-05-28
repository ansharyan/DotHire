import React from "react";
import Logo from "./Logo.jsx";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle= (e) =>{
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <div className="bg-gray-200">
      <header className="">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* logo */}
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600" to="/">
                <span className="sr-only">Home</span>
                <Logo className="size-12"
                  viewBox="0 0 28 24"
                  fill="none"/>
              </Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="block">
                <ul className=" items-center gap-6 text-sm hidden md:flex">
                  <li>
                    <Link
                      className="text-neutral transition hover:text-neutral/75 hover:underline"
                      href="#"
                    >
                      {" "}
                      About{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-neutral transition hover:text-neutral/75 hover:underline"
                      to="/"
                    >
                      {" "}
                      Home{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-neutral transition hover:text-neutral/75 hover:underline"
                      to="/jobs"
                    >
                      {" "}
                      Jobs{" "}
                    </Link>
                  </li>
                </ul>
              </nav>
              
              {/* dropdown */}
              <div className=" md:relative md:block">
                <button
                  type="button"
                  className="overflow-hidden rounded-full border border-gray-300 shadow-inner cursor-pointer"
                  onClick={handleToggle}
                >
                  <span className="sr-only">Toggle dashboard menu</span>

                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="size-10 object-cover "
                  />
                </button>

                <div
                  className={`absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg ${isOpen? "block" : "hidden"}`}
                  role="menu"
                >
                  <div className="p-2">
                    <Link
                      to="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      My profile
                    </Link>

                    <Link
                      to="#"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      role="menuitem"
                    >
                      Applications
                    </Link>
                  </div>

                  <div className="p-2">
                    <form method="POST" action="#">
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                          />
                        </svg>
                        Logout
                      </button>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
