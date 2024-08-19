import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import NavBar from './NavBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Image_API = 'https://image.tmdb.org/t/p/w500/';

export default function MyReviews() {

    const navigate = useNavigate()

    const [userReviews, setUserReviews] = useState([]);
    const [userId, setUserId] = useState(null);


    const [addReview, setAddReview] = useState(false);
    const [review, setReview] = useState('');
    const [selectedOption, setSelectedOption] = useState(0);
    const [reviewIndex, setReviewIndex] = useState('')

    const [reviewUpdated, setReviewUpdated] = useState(false);

    useEffect(() => {
        const getuid=()=>{
            const user = auth.currentUser
            if(user){
                setUserId(user.uid)
            }
            else{
                setTimeout(getuid,10)
            }
        }
        getuid()
    }, []);

    useEffect(() => {
        const getUserReviews = async () => {
            if (!userId) return;

            const collectionRef = collection(db, 'Reviews');
            const q = query(collectionRef, where('userid', '==', userId));
            const querySnapshot = await getDocs(q);
            const reviews = querySnapshot.docs.map(doc => doc.data());
            setUserReviews(reviews);
        };

        getUserReviews();
    }, [userId, reviewUpdated]); 

    const deleteReview = async (rev) => {
        const documentId = `${rev.userid}_${rev.movieid}`;
        await deleteDoc(doc(db, 'Reviews', documentId));
        setUserReviews(prevReviews => prevReviews.filter(review => review.movieid !== rev.movieid));
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        if (!review || selectedOption === 0) {
            alert("Please fill in both the review and rating fields.");
            return;
        }
    
        try {
            const docRef = doc(db, "Reviews", reviewIndex);
            await updateDoc(docRef, {
                'review.content': review,
                'review.star': selectedOption,
            });

            console.log(review, selectedOption)
    
            // Clear the form and close the modal
            setReview('');
            setSelectedOption(0);
            setAddReview(false);
            setReviewIndex('');
            setReviewUpdated(prev => !prev);
            console.log("Review updated successfully");
        } catch (error) {
            console.error("Error updating review: ", error);
        }
    };
    

    return (
        <div>
            <NavBar />
            <h4 style={{ marginTop: '5rem', paddingLeft: '1rem', color:'red' }}>My Reviews</h4>
            <Grid container spacing={4} sx={{ flexGrow: 1, marginTop: '0rem', padding: '1rem' }}>
                {userReviews.length > 0 ? (
                    userReviews.map((rev, index) => (
                        <Grid item lg={6} md={6} key={index}>
                            <Card
                            size="lg"
                            variant="outlined"
                            // orientation="horizontal"
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
                                <Box sx={{display:'flex', alignItems:'center', gap:'0.5rem' }}>
                                        <Avatar sx={{ height: '1.5rem', width: '1.5rem', backgroundColor:'red', cursor:'pointer' }} >{rev.userName.charAt(0)}</Avatar>
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
                                            state: { user_uid: rev.userid, userName: rev.userName, replace:true },
                                        });
                                        }}
                                    >
                                    {rev.userName}
                                    </Typography>
                                    
                                    </Box>
                                    <Typography variant="button" color="text.primary" sx={{fontWeight:'600'}} gutterBottom>
                                    {rev.movie.title}
                                </Typography>
                                <Box sx={{maxHeight:'3rem', overflow:'hidden'}}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ marginBottom: 'auto', marginTop: '0.5rem' }}
                                        >
                                            {rev.review.content}
                                        </Typography>
                                        </Box>
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                    sx={{ marginTop: '0.5rem', fontWeight: 'bold' }}
                                >
                                   <Rating name="read-only" value={rev.review.star} readOnly />
                                </Typography>
                                </Box>

                                <Button variant="contained" 
                                sx={{background:'red'}}
                                onClick={() => {
                                    setReview(rev.review.content)
                                    setSelectedOption(rev.review.star)
                                    setAddReview(!addReview)
                                    setReviewIndex(rev.userid+'_'+rev.movieid)
                                }}
                                >Edit
                                </Button>

                                <Button variant="contained" 
                                onClick={() => deleteReview(rev)} 
                                sx={{marginLeft:'1rem', background:'red'}}
                                >Delete
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
                                onClick={() => { navigate(`/movie/${rev.movie.id}`, { state: rev.movie, replace: true }) }}
                                />
                            </Box>
                            
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No reviews yet for this movie.</Typography>
                )}
            </Grid>



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
                                setReviewIndex('')
                            }}>
                                Close
                            </Button>
                        </div>
                    </form>
                </Box>
        </div>
    );
}
