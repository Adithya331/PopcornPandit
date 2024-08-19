import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import {collection, setDoc, getDoc, getDocs, doc, CollectionReference, addDoc, updateDoc} from 'firebase/firestore'
import { useScrollTrigger } from '@mui/material'

export default function Temp() {

  

  const userid = 'Adithya'
  const movieid = '3'

  useEffect(()=>{

    
  },[])
    
    return (
    <div>
      <div>
        <h4>All reviews</h4>
        {
          allReviews.map((rev, index)=>{
            return(
            <div key={index}>
              <p>name : {rev.userid}</p>
              <p>review : {rev.review.content}</p>
              <p>star : {rev.review.star}</p>
            </div> )
          })
        }
      </div>

      <div>
        <h4>3 reviews</h4>
        {
          movieReviews.map((rev, index)=>{
            return(
            <div key={index}>
              <p>name : {rev.userid}</p>
              <p>movie name: {rev.movieid}</p>
              <p>review : {rev.review.content}</p>
              <p>star : {rev.review.star}</p>
            </div> )
          })
        }
      </div>

      <div>
        <h4>reviews by Adithya</h4>
        {
          userReviews.map((rev, index)=>{
            return(
            <div key={index} >
              <p>name : {rev.userid}</p>
              <p>movie name: {rev.movieid}</p>
              <p>review : {rev.review.content}</p>
              <p>star : {rev.review.star}</p>
            </div> )
          })
        }
      </div>


    </div>
  )
}


// const setdocument = async()=>{
    //   await setDoc(doc(collectionRef, userid+'_'+movieid),{
    //     reviewid: userid+'_'+movieid,
    //     userid: userid,
    //     movieid: movieid,
    //     review:{
    //       content:'Supper bayya',
    //       star:'5'
    //     }
    //   })

    // }
    // setdocument()