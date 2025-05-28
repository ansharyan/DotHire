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

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/jobs" element={<JobsPage/>} />
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/edit-profile" element={<EditProfile/>}/>
        <Route path="/admin/create-job" element={<CreateJob/>}/>
        <Route path="/admin/dashboard" element={<RecruiterDashboard/>}/>
        <Route path="/admin/applicants" element={<Applicants/>}/>
      </Routes>
    </div>
  )
}

export default App
