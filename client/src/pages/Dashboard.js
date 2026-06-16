import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Cards from '../components/Cards'
import FunnelChart from '../components/FunnelChart'

function Dashboard() {
  //state to store funnel analytics data fetched from the API
  const [funnelData, setFunnelData] = useState([])

  const [userCount, setUserCount] = useState(0)
  //state to track to see if the data is still being fetched
  const [loading, setLoading] = useState(true)
//fetches funnel data from the API
  useEffect(() => {
    axios
      .get("https://funnel-tracker-api.onrender.com")
      .then((response) => {
        setFunnelData(response.data) //stores the data in state
      })
      .catch((error) => {
        console.error(error) //logs any errors
      })

    axios.get('https://funnel-tracker-api.onrender.com')
      .then((response) => {
        setUserCount(response.data.length)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false) //stops the loading state whether the request succeeded or failed
      })
  }, []) //empty array which runs only once when the page is loaded initially 

  const getCount = (stage) => {
    const found = funnelData.find(item => item.stage === stage)
    return found ? found.count : 0
  }


  return (
    <Container>
      <h1>Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
      <div className="d-flex gap-3 my-3">
        <Cards title="Total Users" value={userCount} trend="" />
        <Cards title="Sign Ups" value={getCount('Sign Up')} trend="" />
        <Cards title="Activation Rate" value={getCount('Profile Setup')} trend="" />
        <Cards title="7-Day Retention" value={getCount('Return Visit')} trend="" />
      </div>
      <FunnelChart funnelData={funnelData} />
      </>
      )}
    </Container>
  )
}

export default Dashboard