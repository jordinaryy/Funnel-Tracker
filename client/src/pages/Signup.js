import { useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// Signup page that the user enters their email to create an account
function Signup({ setCurrentPage, setUserId }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSignup = () => {
    // Make sure email field is not empty
    if (!email) {
      setError('Please enter an email')
      return
    }

    // Post new user to the backend API
    axios.post('http://localhost:5000/api/users', { email })
      .then((response) => {
        const newUser = response.data

        // Save the user id so we can track their funnel events
        setUserId(newUser.id)

        // Log the sign up funnel event
        return axios.post('http://localhost:5000/api/funnel', {
          user_id: newUser.id,
          stage: 'Sign Up'
        })
      })
      .then(() => {
        // Move to onboarding after successful sign up
        setCurrentPage('onboarding')
      })
      .catch((error) => {
        console.error(error)
        setError('Something went wrong. Please try again.')
      })
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Create your account</h2>
      <p>Enter any email to get started</p>

      <Form.Group className="mt-4">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      {/* Show error message if something goes wrong */}
      {error && <p className="text-danger mt-2">{error}</p>}

      <Button
        variant="primary"
        className="mt-4 w-100"
        onClick={handleSignup}
      >
        Sign Up
      </Button>

      {/* Back button to return to landing page */}
      <Button
        variant="link"
        className="mt-2 w-100"
        onClick={() => setCurrentPage('landing')}
      >
        Back
      </Button>
    </Container>
  )
}

export default Signup