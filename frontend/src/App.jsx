import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage.jsx"
import JobsPage from "./pages/JobsPage.jsx"

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/jobs" element={<JobsPage/>} />
      </Routes>
    </div>
  )
}

export default App
