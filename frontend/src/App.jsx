import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage.jsx"
import JobsPage from "./pages/JobsPage.jsx"
import UserProfile from "./pages/UserProfile.jsx"

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/jobs" element={<JobsPage/>} />
        <Route path="/profile" element={<UserProfile/>}/>
      </Routes>
    </div>
  )
}

export default App
