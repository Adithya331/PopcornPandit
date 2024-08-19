import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { auth, db } from '../firebase'
import { collection, getDocs, setDoc, doc, query, where } from 'firebase/firestore';
import NavBar from './NavBar';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
const Image_API = 'https://image.tmdb.org/t/p/w500/';

export default function User() {

    const location = useLocation();
    const user_uid = location.state.user_uid;
    const userName = location.state.userName;

    const navigate = useNavigate()

    const [userReviews, setUserReviews] = useState([])

    const [readMore, setReadMore] = useState(false);
    const [readReview, setReadReview] = useState(null);

    useEffect(() => {

        const getUserReviews = async () => {

            const collectionRef = collection(db, 'Reviews');
            const q = query(collectionRef, where('userid', '==', user_uid));
            const querySnapshot = await getDocs(q);
            const reviews = querySnapshot.docs.map(doc => {
                return doc.data()
            });
            setUserReviews(reviews)

        }
        getUserReviews()
    }, [userReviews])
    return (
        <div>
            <NavBar></NavBar>
            <h4 style={{ marginTop: '5rem', paddingLeft: '1rem', color:'red' }}>Reviews by {userName}</h4>
            <Grid container spacing={4} sx={{ flexGrow: 1, marginTop: '0rem', padding: "1rem" }}>
                {userReviews.length > 0 ? (
                    userReviews.map((rev, index) => (
                        <Grid item lg={6} md={6} key={index}>
                            <Card
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
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Avatar
                                                sx={{ height: '1.5rem', width: '1.5rem', backgroundColor: 'red', cursor: 'pointer' }}
                                            >
                                                {rev.userName.charAt(0)}
                                            </Avatar>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'red',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    navigate(`/user/${rev.userid}`, {
                                                        state: { user_uid: rev.userid, userName: rev.userName, replace: true },
                                                    });
                                                }}
                                            >
                                                {rev.userName}
                                            </Typography>
                                        </Box>

                                        <Typography variant="button" color="text.primary" sx={{ fontWeight: '600' }} gutterBottom>
                                            {rev.movie.title}
                                        </Typography>
                                        <Box sx={{ maxHeight: '3rem', overflow: 'hidden' }}>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ marginBottom: 'auto', marginTop: '0.5rem' }}
                                            >
                                                {rev.review.content}
                                            </Typography>
                                        </Box>

                                        <Rating name="read-only" value={rev.review.star} readOnly />
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setReadReview(rev);
                                            setReadMore(true);
                                        }}
                                        sx={{ marginTop: '1rem' }}
                                    >
                                        Read More
                                    </Button>
                                </CardContent>
                                <Box sx={{ marginLeft: '1rem' }}>
                                    <img
                                        src={Image_API + rev.movie.poster_path}
                                        alt={rev.movie.title}
                                        height="180"
                                        style={{
                                            borderRadius: '10px',
                                            objectFit: 'cover',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        }}
                                        onClick={() => {
                                            navigate(`/movie/${rev.movie.id}`, { state: rev.movie, replace: true });
                                        }}
                                    />
                                </Box>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{marginLeft:'4rem'}}>No reviews yet.</Typography>
                )}
            </Grid>

            {readMore && readReview && (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    }}
                >
                    <Box
                        sx={{
                            height: 'auto',
                            width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '2rem',
                            border: '1px solid #e0e0e0',
                            borderRadius: '10px',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <Box sx={{ flex: 1, textAlign: 'left', paddingRight: '2rem' }}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#ff1744',
                                        cursor: 'pointer',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    {readReview.userName}
                                </Typography>
                                <Typography
                                    variant="button"
                                    color="text.primary"
                                    sx={{ fontWeight: '600', marginBottom: '1rem' }}
                                >
                                    {readReview.movie.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ marginBottom: '1.5rem' }}
                                >
                                    {readReview.review.content}
                                </Typography>
                                <Rating name="read-only" value={readReview.review.star} readOnly />
                            </Box>

                            <Box sx={{ marginLeft: '1rem', textAlign: 'right' }}>
                                <img
                                    src={Image_API + readReview.movie.poster_path}
                                    alt={readReview.movie.title}
                                    style={{
                                        borderRadius: '10px',
                                        objectFit: 'cover',
                                        width: '180px',
                                        maxHeight: '250px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                            </Box>
                        </Box>

                        <Button
                            onClick={() => {
                                setReadMore(false);
                                setReadReview(null);
                            }}
                            sx={{
                                position: 'absolute',
                                bottom: '1rem',
                                left: '1rem',
                                color: '#ff1744',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                '&:hover': {
                                    color: '#d50000',
                                },
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                </Box>
            )}

        </div>
    )
}
