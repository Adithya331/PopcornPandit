import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import bg from '../assets/bg.jpg';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/home');
      })
      .catch((error) => {
        console.error('Error during sign-in:', error.message); 
        setError(error.message);
      });
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <form style={{ 
          display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: "2rem", 
          width: '30rem', alignItems: 'center', backgroundColor: 'white', borderRadius: '2rem',
          marginLeft: '5rem'
        }}>
          <Typography variant='h4' sx={{ fontWeight: '600' }}>Login</Typography>

          <TextField type='email' label="Email" variant="standard" sx={{ width: '90%' }}
            onChange={(e) => setEmail(e.currentTarget.value)} />

          <TextField type='password' label="Password" variant="standard" sx={{ width: '90%' }}
            onChange={(e) => setPassword(e.currentTarget.value)} />

          {error && <Typography color="error">Invalid Credentials</Typography>}

          <Button variant="contained" sx={{ backgroundColor: 'red', width: '90%' }}
            onClick={handleSubmit}><Typography>LOGIN</Typography></Button>

          <Typography>Already a member? <Link onClick={() => { navigate('/register') }} sx={{ color: 'red', cursor: 'pointer' }}>Signup here</Link></Typography>
        </form>
      </div>
    </div>
  );
}
