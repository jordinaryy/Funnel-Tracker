import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Funnel from './pages/Funnel'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Onboarding from './pages/Onboarding'
import ABTests from './pages/ABTests'
import Surveys from './pages/Surveys'
import Message from './pages/Message'
//state the variable that tracks which page the user is on
function App() {

  const [currentPage, setCurrentPage] = useState('landing')
  const [userId, setUserId] = useState(null)

  // Admin pages that show the navbar
  const adminPages = ['dashboard', 'funnel', 'abtests', 'surveys']
  const isAdminPage = adminPages.includes(currentPage)

  
  return (
    <div>
     {/* //the navigation bar below receives the currentPage and setCurrentPage 
      so it can highlight the link thats active and will allow the user to switch pages on click */}
      {isAdminPage && <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />}

      {/* user pages */}
      {currentPage === 'landing' && <Landing setCurrentPage={setCurrentPage} />}
      {currentPage === 'signup' && <Signup setCurrentPage={setCurrentPage} setUserId={setUserId} />}
      {currentPage === 'onboarding' && <Onboarding setCurrentPage={setCurrentPage} userId={userId} />}
      {currentPage === 'message' && <Message setCurrentPage={setCurrentPage} />}  


      {/* admin pages */}
      {currentPage === 'dashboard' && <Dashboard/>}
      {currentPage === 'funnel' && <Funnel />}
      {currentPage === 'ABtests' && <ABTests />}
      {currentPage === 'surveys' && <Surveys />}
    </div>
  )
}

export default App