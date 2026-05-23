import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Cards from '../components/Cards'
import FunnelChart from '../components/FunnelChart'

function Dashboard() {
  const [funnelData, setFunnelData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/funnel/analytics")
      .then((response) => {
        setFunnelData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
        console.log("Request completed")
      })
  }, [])

  return (
    <Container>
      <h1>Dashboard</h1>
      <div className="d-flex gap-3 ny-3">
        <Cards title="Total Visitors" value={3241} trend="+12%" />
        <Cards title="Sign ups" value={847} trend="+8%" />
        <Cards title="Activation Rate" value="34%" trend="-3%" />
        <Cards title="7-Day Retention" value="18%" trend="+2%" />
      </div>
      <FunnelChart />
    </Container>
  )
}

export default Dashboard