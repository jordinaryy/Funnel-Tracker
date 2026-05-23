import Card from 'react-bootstrap/Card';

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