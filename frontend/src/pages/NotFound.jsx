import { Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link correctamente

const NotFound = () => {
  return (
    <div className='eDesc' style={{
      maxWidth: '100%',
      height: 'calc(100vh - 10%)', 
      margin: '10rem auto', // Centra horizontalmente
      padding: '5rem',
      textAlign: 'center' // Alinea el texto al centro
    }}>
      <Container className="pt-5">
        <h1 className="mb-4">La ruta que intentas consultar no existe :/</h1>
        <Link to="/" className="btn btn-primary">
          Regresar a Home
        </Link>
      </Container>
    </div>
  );
};

export default NotFound;
