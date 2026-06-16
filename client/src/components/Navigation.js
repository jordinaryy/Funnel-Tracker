import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//Navigation component receives the currentPage and setCurrentPage from app.js
function Navigation({ currentPage, setCurrentPage }) {
  return (
    //expand="lg" shows full navbar on large screens and a hamburger menu on smaller screen
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        {/* brand name shown on the left side of the navbar */}
        <Navbar.Brand href="#home">FunnelTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setCurrentPage('dashboard')}>Dashboard</Nav.Link>
            <Nav.Link onClick={() => setCurrentPage('funnel')}>Funnel</Nav.Link>
            <Nav.Link onClick={() => setCurrentPage('abtests')}>A/B Tests</Nav.Link>
            <Nav.Link onClick={() => setCurrentPage('surveys')}>Surveys</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigation;