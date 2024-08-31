//Profile.jsx
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProfileComponent() {
  return (
    <div className='eDesc' style={{
      maxWidth: '100%',
      height: 'calc(100vh - 15%)',
      marginTop:'5rem',       
      marginBottom: '10rem',
      padding: '4.5rem',        
}}>
    
      <h1 className="mb-4">Profile</h1>
      <h5>example@gmail.com</h5>

      <Button variant='dark'className="mt-4">
       🔒 Log Out
      </Button>

    
   </div>
     );
    };
export default ProfileComponent;


