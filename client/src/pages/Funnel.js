import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import FunnelChart from '../components/FunnelChart'

function Funnel() {
  //state to store funnel analytics data fetched from the API
  const [funnelData, setFunnelData] = useState([])
  //state to track to see if the data is still being fetched
 
//fetches funnel data from the API
  useEffect(() => {
    axios
      .get("https://funnel-tracker-api.onrender.com/api/funnel/analytics")
      .then((response) => {
        setFunnelData(response.data) //stores the data in state
      })
      .catch((error) => {
        console.error(error) //logs any errors
      })
  }, [])

  return (
    <Container className="mt-4">
      <h1>Funnel Analysis</h1>
      <p> breakdown of each onboarding stage</p>
      <FunnelChart funnelData={funnelData} />
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Stage</th>
            <th>Users</th>
            <th>Drop Off</th>
          </tr>
        </thead>
        <tbody>
          {funnelData.map((item, index) => (
            <tr key={index}>
              <td>{item.stage}</td>
              <td>{item.count}</td>
              <td>
                {index === 0 ? '-' : `${Math.round((1 - item.count / funnelData[index - 1].count) * 100)}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Funnel