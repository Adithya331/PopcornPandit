import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { collection, getDocs, setDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';
import NavBar from './NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import './Home.css';

const Image_API = 'https://image.tmdb.org/t/p/w500/';

export default function Movie() {
    const navigate = useNavigate();
    const location = useLocation();
    const movie = location.state
    const [similarMovies, setSimilarMovies] = useState([]);
    const [userUid, setUserUid] = useState(null);
    const [addReview, setAddReview] = useState(false);
    const [review, setReview] = useState('');
    const [selectedOption, setSelectedOption] = useState(0);
    const [movieReviews, setMovieReviews] = useState([]);

    useEffect(() => {
        const getSimilarMovies = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=3b933c4dc256cf8e2f9e55526b2c1c4c`);
            setSimilarMovies(response.data.results);
        };

        getSimilarMovies();

        if (auth.currentUser) {
            setUserUid(auth.currentUser.uid);
        }
    }, [movie]);

    useEffect(() => {
        const fetchMovieReviews = async () => {
            try {
                const q = query(collection(db, 'Reviews'), where('movieid', '==', movie.id));
                const querySnapshot = await getDocs(q);
                const reviews = querySnapshot.docs.map(doc =>{
                    return doc.data()
                });
                setMovieReviews(reviews);
            } catch (error) {
                console.error('Error fetching movie reviews:', error);
            }
        };

        fetchMovieReviews();
    }, [movie]);

    const handleSubmit = async () => {
        const docId = `${userUid}_${movie.id}`;

        const reviewData = {
            userName: auth.currentUser.displayName,
            userid: userUid,
            movie: movie,  
            movieid: movie.id,
            review: {
                content: review,
                star: selectedOption,
            },
        };
        // console.log(reviewData);

        try {
            await setDoc(doc(db, 'Reviews', docId), reviewData);
            // console.log('Review submitted successfully');
            setReview('');
            setSelectedOption(0);
            setAddReview(false);
            const q = query(collection(db, 'Reviews'), where('movieid', '==', movie.id));
            const querySnapshot = await getDocs(q);
            setMovieReviews(querySnapshot.docs.map(doc => doc.data()));
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div style={{backgroundColor:'#EEEEEE'}}>
            <NavBar />
            <div style={{ marginTop: '4rem', display: 'flex', flexGrow: '1' }}>
                <div style={{ flex: '1',flexGrow: '1',width:'50%', display: 'flex',
                     flexDirection: 'column', padding: '2rem', gap: '1rem', borderRight:'2px solid gray' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <img 
                            src={Image_API + movie.poster_path} 
                            alt="Description" 
                            height={400} 
                            width={300} 
                            style={{ borderRadius: '0.5rem' }} 
                        />
                        <Typography variant="h5">{movie.title}</Typography>
                        <Typography variant="body1" sx={{paddingRight:'4rem'}}>{movie.overview}</Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" onClick={() => setAddReview(!addReview)}>
                            Add Review
                        </Button>
                    </Box>
                    <Box>
                        <Typography variant="h6">Similar Movies</Typography>
                        <Grid container sx={{ gap: '1rem' }}>
                            {similarMovies.map((smovie, index) => (
                                smovie.id !== movie.id && (
                                    <Grid 
                                        item xs={3} 
                                        sm={3} md={3} 
                                        lg={3} key={index} 
                                        onClick={() => { navigate(`/movie/${smovie.id}`, { state: smovie, replace: true }) }}
                                    >
                                        <Card key={index} 
                                            sx={{display:'flex', flexDirection:'column', flexShrink:'0',flexGrow:'0', marginRight:'1rem', width:'10rem',
                                            transition: 'transform 0.3s', gap:'1rem',
                                            '&:hover': {
                                                transform: 'scale(1.05)', 
                                            }, }}>
                                            <CardMedia
                                                sx={{ height: '14rem'}}
                                                image={Image_API+smovie.poster_path}/>
                                        </Card>
                                    </Grid>
                                )
                            ))}
                        </Grid>
                    </Box>
                </div>

                {/* Right half */}
                <div style={{width:'50%', display:'flex', flexDirection:'column', gap:'2rem', padding:'2rem'}}>
                    <h5>Reviews for {movie.title}</h5>
                    {movieReviews.length > 0 ? (
                        movieReviews.map((rev, index) => (
                            <Card
                            key={index}
                            size="lg"
                            variant="outlined"
                            orientation="horizontal"
                            sx={{
                                height: 200,
                                maxHeight: 200,
                                display: 'flex',
                                alignItems: 'center',
                                padding: '1rem',
                                '&:hover': {
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                                },
                                border: '1px solid #e0e0e0',
                                borderRadius: '10px',
                                overflow: 'hidden',
                            }}
                            >
                            <CardContent sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                    cursor: 'pointer',
                                    marginBottom: '0.5rem',
                                    }}
                                    onClick={() => {
                                    navigate(`/user/${rev.userid}`, {
                                        state: { user_uid: rev.userid, userName: rev.userName },
                                    });
                                    }}
                                >
                                    {rev.userName}
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary" gutterBottom>
                                    {rev.movie.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ marginBottom: 'auto', marginTop: '0.5rem', maxHeight:'4rem', overflow:'hidden' }}
                                >
                                    {rev.review.content}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                    sx={{ marginTop: '0.5rem', fontWeight: 'bold' }}
                                >
                                   <Rating name="read-only" value={rev.review.star} readOnly />
                                </Typography>
                                </Box>
                            </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Typography>No reviews yet for this movie.</Typography>
                    )}
                </div>

                {/* Review Form */}
                <Box 
                    style={addReview ? {
                        width: "100%",
                        height: "100%",
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    } : { display: "none" }}
                >
                    <form 
                        style={{ 
                            display: 'flex', flexDirection: 'column', 
                            gap: '1rem', padding: '2rem', backgroundColor: 'white', 
                            width: '25rem', borderRadius: '1rem'
                        }}
                    >
                        <TextField
                            label="Write a Review"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />

                        <Typography component="legend">Star Rating</Typography>
                        <Rating
                            name="simple-controlled"
                            value={selectedOption}
                            onChange={(event, newValue) => {
                            setSelectedOption(newValue);
                            }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button variant="outlined" color="error" 
                            onClick={() => {

                                setReview('')
                                setSelectedOption('')
                                setAddReview(false)
                            }}>
                                Close
                            </Button>
                        </div>
                    </form>
                </Box>
            </div>
        </div>
    );
}
