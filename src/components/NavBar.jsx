import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { responsiveFontSizes } from '@mui/material';

export default function NavBar() {
  const [userName, SetUserName] = useState(null)
  const navigate = useNavigate('/home')

  useEffect(()=>{
    const user = auth.currentUser
    if(user)
    {
      SetUserName(user.displayName)
    }
    else{
      const unsubscribe = auth.onAuthStateChanged((user)=>{
        if(user){
          SetUserName(user.displayName)
        }
        else{
          SetUserName(null)
        }
      })
      return () => unsubscribe()
    }

  },[])
  
  return (

    
    
    <Box>
        <AppBar component="nav" sx={{backgroundColor:'#D50000'}}>
            <Toolbar>
            <Typography
                variant="h5"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color:'white', fontWeight:'700' } }}
                onClick={()=>navigate('/home')}
                style={{cursor:'pointer'}}
            >
                PopcornPandit
            </Typography>
            <Box sx={{display:'flex', gap:'1rem', marginRight:'3rem'}}>
              <Typography variant='button' sx={{fontWeight:'600',cursor:'pointer'}} onClick={()=>{navigate('/home',{replace:true})}}>Home</Typography>
              <Typography variant='button' sx={{fontWeight:'600',cursor:'pointer'}} onClick={()=>{navigate('/allreviews',{replace:true})}} >All Reviews</Typography>
              <Typography variant='button' sx={{fontWeight:'600',cursor:'pointer'}} onClick={()=>{navigate('/myreviews',{replace:true})}}>My Reviews</Typography>
            </Box>
            {userName && (
                <Box sx={{display:'flex', gap:'0.5rem', alignItems:'center', marginRight:'2rem'}}>
                  <Avatar sx={{ height: '2rem', width: '2rem', backgroundColor:'black', cursor:'pointer' }} >{userName.charAt(0)}</Avatar>
                  <Typography sx={{fontFamily:'cursive'}}>{userName}</Typography>
                </Box>
            )}
            <Button  sx={{backgroundColor:'white',
              '&:hover': {
                transform: 'scale(1.05)', 
                backgroundColor:'#FAFAFA',
              }
            }}
            onClick={()=>{
                signOut(auth).then(()=>{
                  navigate('/')
                })
            }}
            ><Typography variant='subtitle' sx={{color:'#D50000'}} >Logout</Typography></Button>
            </Toolbar>
        </AppBar>
    </Box>
      
  )
}
