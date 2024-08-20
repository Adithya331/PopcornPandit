import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import NavBar from './NavBar'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';


const APIKEY = '3b933c4dc256cf8e2f9e55526b2c1c4c'
const NOWPLAYING = 'https://api.themoviedb.org/3/movie/now_playing?api_key=3b933c4dc256cf8e2f9e55526b2c1c4c&language=en-US&page=1'
const POPULAR = 'https://api.themoviedb.org/3/movie/popular?api_key=3b933c4dc256cf8e2f9e55526b2c1c4c&language=en-US&page=1'
const TOP_RATED = 'https://api.themoviedb.org/3/movie/top_rated?api_key=3b933c4dc256cf8e2f9e55526b2c1c4c&language=en-US&page=1'
const UPCOMING = 'https://api.themoviedb.org/3/movie/upcoming?api_key=3b933c4dc256cf8e2f9e55526b2c1c4c&language=en-US&page=1'
const Image_API = 'https://image.tmdb.org/t/p/w500/'

export default function Home() {

  const [nowPlaying, SetNowPlaying] = useState([])
  const [popular, SetPopular] = useState([])
  const [topRated, SetTopRated] = useState([])
  const [upComing, SetUpComing] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const user = location.state
  

  useEffect(()=>{
    const getFilms = async ()=>{
      await axios.get(NOWPLAYING)
      .then((response)=>{
        SetNowPlaying(response.data.results)
      })

      await axios.get(POPULAR)
      .then((response)=>{
        SetPopular(response.data.results)
      })

      await axios.get(TOP_RATED)
      .then((response)=>{
        SetTopRated(response.data.results)
      })

      await axios.get(UPCOMING)
      .then((response)=>{
        SetUpComing(response.data.results)
      })

    }
    getFilms()
  },[])

  
  return (
    <div>
      <NavBar></NavBar>
      <div style={{marginTop:'5rem', padding:'1rem'}} >
      <h2>Now Playing</h2>
      <div className='movie-container' >
        {
          nowPlaying.map((movie, index)=>{
            return(
              <Card key={index} 
                    onClick={() => { navigate(`/movie/${movie.id}`, { state: movie }) }}
                    sx={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      marginRight: '1rem', 
                      flexShrink:'0',flexGrow:'0',
                      width: '12rem', 
                      transition: 'transform 0.3s, box-shadow 0.3s', 
                      gap: '0.5rem', 
                      borderRadius: '12px', 
                      overflow: '', 
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        transform: 'scale(1.08)', 
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                      },
                    }}>
                <CardMedia
                  sx={{ height: 240, backgroundSize: 'cover' }}
                  image={Image_API + movie.poster_path}
                />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#333',
                    padding: '0.5rem 0.5rem',
                    fontSize: '1rem',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}>
                  {movie.title}
                </Typography>
              </Card>
            )
          })
        }
      </div>
      </div>

      <div style={{marginTop:'2rem', padding:'1rem'}}>
        <h2>Popular</h2>
        <div className='movie-container' >
          {
            popular.map((movie, index)=>{
              return(
                <Card key={index} 
                    onClick={() => { navigate(`/movie/${movie.id}`, { state: movie }) }}
                    sx={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      marginRight: '1rem', 
                      flexShrink:'0',flexGrow:'0',
                      width: '12rem', 
                      transition: 'transform 0.3s, box-shadow 0.3s', 
                      gap: '0.5rem', 
                      borderRadius: '12px', 
                      overflow: '', 
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        transform: 'scale(1.08)', 
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                      },
                    }}>
                <CardMedia
                  sx={{ height: 240, backgroundSize: 'cover' }}
                  image={Image_API + movie.poster_path}
                />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#333',
                    padding: '0.5rem 0.5rem',
                    fontSize: '1rem',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}>
                  {movie.title}
                </Typography>
              </Card>
              )
            })
          }
        </div>
      </div>

      <div style={{marginTop:'2rem', padding:'1rem'}}>
        <h2>Top Rated</h2>
        <div className='movie-container' >
          {
            topRated.map((movie, index)=>{
              return(
                <Card key={index} 
                    onClick={() => { navigate(`/movie/${movie.id}`, { state: movie }) }}
                    sx={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      marginRight: '1rem', 
                      flexShrink:'0',flexGrow:'0',
                      width: '12rem', 
                      transition: 'transform 0.3s, box-shadow 0.3s', 
                      gap: '0.5rem', 
                      borderRadius: '12px', 
                      overflow: '', 
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        transform: 'scale(1.08)', 
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                      },
                    }}>
                <CardMedia
                  sx={{ height: 240, backgroundSize: 'cover' }}
                  image={Image_API + movie.poster_path}
                />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#333',
                    padding: '0.5rem 0.5rem',
                    fontSize: '1rem',
                    textOverflow: 'ellipsis', 
                    whiteSpace: 'nowrap',
                  }}>
                  {movie.title}
                </Typography>
              </Card>
              )
            })
          }
        </div>
      </div>

      <div style={{marginTop:'2rem', padding:'1rem'}}>
        <h2>Up Coming</h2>
        <div className='movie-container' >
          {
            upComing.map((movie, index)=>{
              return(
              <Card key={index} 
                    onClick={() => { navigate(`/movie/${movie.id}`, { state: movie }) }}
                    sx={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      marginRight: '1rem', 
                      flexShrink:'0',flexGrow:'0',
                      width: '12rem', 
                      transition: 'transform 0.3s, box-shadow 0.3s', 
                      gap: '0.5rem', 
                      borderRadius: '12px', 
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#ffffff',
                      '&:hover': {
                        transform: 'scale(1.08)', 
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                      },
                    }}>
                <CardMedia
                  sx={{ height: 240, backgroundSize: 'cover' }}
                  image={Image_API + movie.poster_path}
                />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: '#333',
                    padding: '0.5rem 0.5rem',
                    fontSize: '1rem',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}>
                  {movie.title}
                </Typography>
              </Card>

              )
            })
          }
        </div>
      </div>


    </div>
  )
}
