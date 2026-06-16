import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

// Admin surveys page that displays all exit survey responses from users who abandoned onboarding
function Surveys() {
  const [surveyData, setSurveyData] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all survey responses from the backend when the page loads
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/surveys')
      .then((response) => {
        setSurveyData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <Container className="mt-4">
      <h1>Exit Surveys</h1>
      <p>Reasons why the user gave up on the onboarding flow</p>

      {loading ? (
        <p>Loading...</p>
      ) : surveyData.length === 0 ? (
        <p>No survey responses yet.</p>
      ) : (
        // Table showing stage, reason, and count for each survey response
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Reason</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {surveyData.map((item, index) => (
              <tr key={index}>
                <td>{item.stage}</td>
                <td>{item.reason}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default Surveys