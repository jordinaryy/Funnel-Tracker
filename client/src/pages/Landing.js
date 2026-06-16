import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

// Landing page 
function Landing({ setCurrentPage }) {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to FunnelTrackApp</h1>
      <p className="mt-3">  
        Sign up and complete a quick onboarding flow. Your feedback will help us improve, Thank you very much!
      </p>
      {/* Sign up button takes user to the sign up page */}
      <Button
        variant="primary"
        className="mt-4"
        onClick={() => setCurrentPage('signup')}
      >
        Get Started
      </Button>
        {/* Admin button for viewing analytics dashboard */}
      <br />
      <Button
        variant="outline-secondary"
        className="mt-3"
        onClick={() => setCurrentPage('dashboard')}
      >
        Admin Dashboard
    </Button>
    </Container>
  )
}

export default Landing