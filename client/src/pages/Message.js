import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

// Complete page that shows when a user finishes all onboarding steps
function Message({ setCurrentPage }) {
  return (
    <Container className="text-center mt-5">
      <h1> You're good to go!</h1>
      <p className="mt-3">You have successfully completed the onboarding process.</p>
      <p>Thank you for using my FunnelTracker app! I hope you find it as cool as i did!!</p>
      <Button
        variant="primary"
        className="mt-4"
        onClick={() => setCurrentPage('landing')}
      >
        Back to Home
      </Button>
    </Container>
  )
}

export default Message