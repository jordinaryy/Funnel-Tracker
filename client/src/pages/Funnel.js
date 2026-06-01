import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import FunnelChart from '../components/FunnelChart'

function Funnel() {
  //state to store funnel analytics data fetched from the API
  const [funnelData, setFunnelData] = useState([])
  //state to track to see if the data is still being fetched
  const [loading, setLoading] = useState(true)
//fetches funnel data from the API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/funnel/analytics")
      .then((response) => {
        setFunnelData(response.data) //stores the data in state
      })
      .catch((error) => {
        console.error(error) //logs any errors
      })
      .finally(() => {
        setLoading(false) //stops the loading state whether the request succeeded or failed
      })
  }, [])

  return (
    <Container className="mt-4">
      <h1>Funnel Analysis</h1>
      <p> breakdown of each onboarding stage</p>
      <FunnelChart />
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Stage</th>
            <th>Users</th>
            <th>Drop Off</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Landing Page</td><td>10000</td><td>-</td></tr>
          <tr><td>Sign Up</td><td>773</td><td>43%</td></tr>
          <tr><td>Profile Setup</td><td>391</td><td>64%</td></tr>
          <tr><td>First Action</td><td>221</td><td>44%</td></tr>
          <tr><td>Return Visit</td><td>121</td><td>33%</td></tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default Funnel