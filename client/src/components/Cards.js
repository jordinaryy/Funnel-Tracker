import Card from 'react-bootstrap/Card';

//reusable card components that display a single thing on the dashboard
function Cards({ title, value, trend }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{value}</Card.Text>  
        <Card.Text>{trend}</Card.Text>      
      </Card.Body>
    </Card>
  );
}

export default Cards