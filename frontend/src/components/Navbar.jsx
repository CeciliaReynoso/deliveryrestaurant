import { Navbar, Nav, Button, Container, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

const NavbarComponent = () => {
  const { user, token, logOut } = useContext(UserContext); // Obtenemos `token` y `logOut` del UserContext
  const { getTotal } = useContext(CartContext); // Obtenemos el total del carrito desde el CartContext
  const total = getTotal(); // Obtiene el total desde el contexto
  const navigate = useNavigate(); // Hook para la navegación

  console.log('User in Navbar:', user); // Para depuración

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ position: 'fixed', top: '0', width: '100%', zIndex: 1030 }}>
      <Container fluid className='navbar-container'>
        <Navbar.Brand as={Link} to="/">Pizzería Mamma Mía!</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex w-100 justify-content-between align-items-center">
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/">🍕 Home</Nav.Link>

                {/* Muestra el perfil y logout si hay token, de lo contrario muestra login/register */}
                {token ? (
                  <>
                    <Nav.Link as={Link} to="/profile">🔓 Profile</Nav.Link>
                    <Nav.Link onClick={logOut}>🔒 Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">🔐 Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">🔐 Register</Nav.Link>
                  </>
                )}
              </Nav>

              <div className='total-container'>
                <Nav.Link as={Link} to="/cart">
                  <Button variant="outline-info" className="mt-2 mt-lg-0">
                    🛒 Total: ${total.toLocaleString('es-CL')}
                  </Button>
                </Nav.Link>
              </div>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
