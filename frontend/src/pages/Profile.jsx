//Profile.jsx
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProfileComponent() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  

  // const logOut = () => {
  //   navigate("/")
  //   setUser({ username : "", password: "",  token: false})
  // }

  const logOut = () => {
    // Elimina el usuario de localStorage
    localStorage.removeItem('user');
    
    // Establece el usuario en el estado del contexto
    setUser({ username: "", password: "", token: false });
    
    // Redirige al home
    navigate("/");
  }
  

  console.log('User in Profile:', user);


  return (
    <div>
      <div className='eDesc' style={{
      maxWidth: '100%',
      height: 'calc(100vh - 15%)',
      marginTop:'5rem',       
      marginBottom: '10rem',
      padding: '4.5rem',        
      }}>
        {user? 
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>{user.password}</Card.Text>
            <Button onClick={()=>{logOut()}} variant='dark'className="mt-4">
             🔒 Log Out
            </Button>

          </Card.Body>
        </Card>
         : 
        <><h2>Loading...</h2></>}
      </div>
    </div>
  );
}



