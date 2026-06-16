import { useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

// Onboarding page — walks user through setup steps after signing up
function Onboarding({ setCurrentPage, userId }) {
  const [step, setStep] = useState(1)
  const [showSurvey, setShowSurvey] = useState(false)
  const [surveyReason, setSurveyReason] = useState('')

  // Funnel stages in order
  const stages = [
    'Email Verified',
    'Profile Setup',
    'First Action',
    'Return Visit'
  ]

  // Calculate progress bar percentage
  const progress = (step / stages.length) * 100

  // Log funnel event when user completes a step
  const completeStep = () => {
    axios.post('http://localhost:5000/api/funnel', {
      user_id: userId,
      stage: stages[step - 1]
    })
    .then(() => {
      if (step < stages.length) {
        setStep(step + 1) // Move to next step
      } else {
        return axios.put(`http://localhost:5000/api/abtest/${userId}`) 
      }
    })
    .then((response) => {
      if (response) {
        setCurrentPage('complete')
      }
    })
    .catch((error) => {
      console.error(error)
    })
  }

  // Show survey when user abandons a step
  const handleAbandon = () => {
    setShowSurvey(true)
  }

  // Save survey response and exit onboarding
  const submitSurvey = () => {
    axios.post('http://localhost:5000/api/surveys', {
      user_id: userId,
      stage: stages[step - 1],
      reason: surveyReason
    })
    .then(() => {
      setCurrentPage('landing')
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2>Getting Started</h2>

      {/* Progress bar showing how far through onboarding the user is */}
      <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mt-3 mb-4" />

      {/* Current step content */}
      {!showSurvey ? (
        <>
          <h4>Step {step}: {stages[step - 1]}</h4>
          <p className="mt-3">Complete this step to continue your setup.</p>

          <Button
            variant="primary"
            className="mt-4 w-100"
            onClick={completeStep}
          >
            Complete Step
          </Button>

          {/* Abandon button triggers exit survey */}
          <Button
            variant="link"
            className="mt-2 w-100 text-danger"
            onClick={handleAbandon}
          >
            Skip and Exit
          </Button>
        </>
      ) : (
        // Exit survey shown when user abandons
        <>
          <h4>Before you go...</h4>
          <p>Why are you leaving this step?</p>

          {/* Survey reason options */}
          {['Too many steps', 'Not sure what to do', 'Just exploring', 'Will come back later'].map((reason) => (
            <Button
              key={reason}
              variant={surveyReason === reason ? 'primary' : 'outline-secondary'}
              className="mt-2 w-100"
              onClick={() => setSurveyReason(reason)}
            >
              {reason}
            </Button>
          ))}

          <Button
            variant="danger"
            className="mt-4 w-100"
            onClick={submitSurvey}
            disabled={!surveyReason}
          >
            Submit and Exit
          </Button>
        </>
      )}
    </Container>
  )
}

export default Onboarding