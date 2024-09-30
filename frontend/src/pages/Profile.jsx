import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProfileComponent() {
  const { getUser, user, logOut } = useContext(UserContext);
  const navigate = useNavigate();

  // Llama a getUser al montar el componente
  useEffect(() => {
    getUser(); // Obtiene el usuario desde la API
  }, [getUser]);

  const handleLogout = () => {
    logOut(); // Utiliza el método logOut del contexto
    navigate("/"); // Redirige al home después de cerrar sesión
  };

  console.log('User in Profile:', user); // Verifica el objeto user

  return (
    <div>
      <div className='eDesc' style={{
        maxWidth: '100%',
        height: 'calc(100vh - 15%)',
        marginTop: '5rem',
        marginBottom: '10rem',
        padding: '4.5rem',
      }}>
        {user ? (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{user.username || "Usuario"}</Card.Title> {/* Muestra el nombre de usuario */}
              <Card.Text>
                {user.email ? `${user.email}` : "Email no disponible"} {/* Muestra el email */}
              </Card.Text>
              <Button onClick={handleLogout} variant='dark' className="mt-4">
                🔒 Log Out
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}
