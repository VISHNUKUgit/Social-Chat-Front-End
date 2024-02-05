import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

function NavComponent() {
  const navigate = useNavigate()
  const handleLogout = () => {
    console.log("ok");
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    navigate('/')
    window.location.reload();
  }
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-success ">
          <Container fluid>
            <Navbar.Brand href="#">Social Chat</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <span style={{cursor:'pointer'}} onClick={handleLogout}>logout</span>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavComponent;
