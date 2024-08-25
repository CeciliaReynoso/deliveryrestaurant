import { Navbar, Nav, Button, Container, Offcanvas } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { formatTotal } from '../utils/format';

const NavbarComponent = ({ total }) => {
  const token = false; // Cambia a true para simular un usuario logueado

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ position: 'fixed', top: '0', width: '100%', zIndex: 1030 }}>
      <Container fluid className='navbar-container'>
        <Navbar.Brand href="#home">Pizzería Mamma Mía!</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex w-100 justify-content-between align-items-center">
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="#home">🍕 Home</Nav.Link>
                {token ? (
                  <>
                    <Nav.Link href="#profile">🔓 Profile</Nav.Link>
                    <Nav.Link href="#logout">🔒 Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="#login">🔐 Login</Nav.Link>
                    <Nav.Link href="#register">🔐 Register</Nav.Link>
                  </>
                )}
              </Nav>
              <div className='total-container'>
                <Button variant="outline-info" className="mt-2 mt-lg-0">
                  🛒 Total: ${formatTotal(total)}
                </Button>
              </div>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  total: PropTypes.number.isRequired,
};

export default NavbarComponent;
