import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Admin A/B tests page that displays real conversion rates for each variant
function ABTests() {
  const [abData, setAbData] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch real A/B test results from the backend when the page loads
  useEffect(() => {
    axios
      .get('https://funnel-tracker-api.onrender.com/api/abtest')
      .then((response) => {
        setAbData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Find variant A and B from the fetched data
  const variantA = abData.find(item => item.variant === 'A')
  const variantB = abData.find(item => item.variant === 'B')

  return (
    <Container className="mt-4">
      <h1>A/B Tests</h1>
      <p>Compare conversion rates between onboarding variants</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Variant comparison cards */}
          <Row className="mb-4">
            <Col>
              <Card border={variantA?.conversion_rate > variantB?.conversion_rate ? 'success' : 'secondary'}>
                <Card.Body>
                  <Card.Title>Variant A</Card.Title>
                  <h2>{variantA ? `${variantA.conversion_rate}%` : 'No data yet'}</h2>
                  <Card.Text>Conversion Rate</Card.Text>
                  <Card.Text>{variantA ? `${variantA.total_users} users` : ''}</Card.Text>
                  {variantA?.conversion_rate > variantB?.conversion_rate && (
                    <Card.Text className="text-success">Winner</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card border={variantB?.conversion_rate > variantA?.conversion_rate ? 'success' : 'secondary'}>
                <Card.Body>
                  <Card.Title>Variant B</Card.Title>
                  <h2>{variantB ? `${variantB.conversion_rate}%` : 'No data yet'}</h2>
                  <Card.Text>Conversion Rate</Card.Text>
                  <Card.Text>{variantB ? `${variantB.total_users} users` : ''}</Card.Text>
                  {variantB?.conversion_rate > variantA?.conversion_rate && (
                    <Card.Text className="text-success">Winner</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Detailed results table for conversion rates/users*/}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Variant</th>
                <th>Total Users</th>
                <th>Conversions</th>
                <th>Conversion Rate</th>
              </tr>
            </thead>
            <tbody>
              {abData.map((item, index) => (
                <tr key={index}>
                  <td>{item.variant}</td>
                  <td>{item.total_users}</td>
                  <td>{item.conversions}</td>
                  <td>{item.conversion_rate}%</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  )
}

export default ABTests