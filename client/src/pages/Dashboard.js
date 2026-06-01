import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Cards from '../components/Cards'
import FunnelChart from '../components/FunnelChart'

function Dashboard() {
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
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error) //logs any errors
      })
      .finally(() => {
        setLoading(false) //stops the loading state whether the request succeeded or failed
        console.log("Request completed")
      })
  }, []) //empty array which runs only once when the page is loaded initially 

  return (
    <Container>
      <h1>Dashboard</h1>
      <div className="d-flex gap-3 ny-3">
        <Cards title="Total Visitors" value={2000} trend="+25%" />
        <Cards title="Sign ups" value={563} trend="+12%" />
        <Cards title="Activation Rate" value="34%" trend="-10%" />
        <Cards title="7-Day Retention" value="18%" trend="+8%" />
      </div>
      <FunnelChart />
    </Container>
  )
}

export default Dashboard