import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

// Landing page 
function Landing({ setCurrentPage }) {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to FunnelTrackApp</h1>
      <p className="mt-3">  
      </p>
      {/* Sign up button takes user to the sign up page */}
      <Button
        variant="primary"
        className="mt-4"
        onClick={() => setCurrentPage('signup')}
      >
        Get Started
      </Button>
    </Container>
  )
}

export default Landing