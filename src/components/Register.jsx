import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import {auth} from '../firebase'
import bg from '../assets/bg.jpg'


export default function Register() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: username
      })
      navigate('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%' }}>

      </div> */}

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'
       }} >        
        <form style={{ 
          display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: "2rem", 
          width: '30rem', alignItems: 'center', backgroundColor:'white',borderRadius:'2rem',
          marginLeft:'5rem'}}>          
          <Typography variant='h4' sx={{ fontWeight: '600' }}>Sign in</Typography>
          
          <TextField type='text' label="Username" variant="standard" sx={{ width: '25rem' }}
          onChange={(e)=>{setUsername(e.currentTarget.value)}}  />
          
          <TextField type='email' label="Email" variant="standard" sx={{ width: '25rem' }}
          onChange={(e)=>{setEmail(e.currentTarget.value)}}  />
          
          <TextField type='password' label="Password" variant="standard" sx={{ width: '25rem' }} 
          onChange={(e)=>{setPassword(e.currentTarget.value)}} />
          
          <Button variant="contained" sx={{ backgroundColor: 'red', width: '25rem' }} 
          onClick={handleSubmit}><Typography>Sign up</Typography></Button>
          
          <Typography>Already a PopcornPandit ? <Link onClick={() => { navigate('/') }} sx={{ color: 'red', cursor: 'pointer' }} >Login here</Link> </Typography>
        </form>
      </div>



    </div>
  )
}
