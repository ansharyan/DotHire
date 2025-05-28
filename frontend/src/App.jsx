import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage.jsx"
import JobsPage from "./pages/JobsPage.jsx"
import UserProfile from "./pages/UserProfile.jsx"
import EditProfile from "./pages/EditProfile.jsx"
import LoginPage from "./pages/Authentication/LoginPage.jsx"
import SignUpPage from "./pages/Authentication/SignUpPage.jsx"
import CreateJob from "./pages/Jobs/CreateJob.jsx"
import RecruiterDashboard from "./pages/RecruiterDashboard.jsx"
import Applicants from "./components/Applicants/Applicants.jsx"
import { useQuery } from "@tanstack/react-query"

function App() {

   const{data:authUser, isLoading, isError, error} = useQuery({
    queryKey: ["authUser"],
    queryFn: async() =>{
      try {
        const res = await fetch("/api/user/me");
        const data = await res.json();
        if(data.error){return null;}
        if(!res.ok){
          throw new Error(data.error || "Something went wrong!");
        }
        return data;

      } catch (error) {
        throw new Error(error.message);
      }
    },retry: 1,
  })

  if(isLoading){
    return(<div className="h-screen flex justify-center items-center">
      Loading...
    </div>)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={authUser ? <JobsPage/> : <LoginPage/> } />
        <Route path="/signup" element={authUser? <JobsPage/> : <SignUpPage/>} />
        <Route path="/jobs" element={authUser ? <JobsPage/> : <LoginPage/>} />
        <Route path="/profile" element={authUser ? <UserProfile/> : <LoginPage/>}/>
        <Route path="/edit-profile" element={authUser ? <EditProfile/> : <LoginPage/>}/>
        <Route path="/admin/create-job" element={authUser ? <CreateJob/> : <LoginPage/>}/>
        <Route path="/admin/dashboard" element={authUser ? <RecruiterDashboard/> : <LoginPage/>}/>
        <Route path="/admin/applicants" element={authUser ? <Applicants/> : <LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App
