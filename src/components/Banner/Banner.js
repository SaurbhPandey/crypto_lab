import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React from 'react';
import '../../App.css'
import Carousel from './Carousel';


const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage : "url(./banner2.jpg)"
    },
    bannerContent:{
        height : 400,
        display : "flex",
        flexDirection : "column",
        paddingTop: 25,
        justifyContent:"space-around",
    },
    cryptoContent:{
      display:"flex",
      height:"40%",
      justifyContent:"center",
      flexDirection:"column",
      textAlign:"center"
    }
}))
const Banner = () => {
    const classes = useStyles();
  return (
    <div className={classes.banner}>
     <Container className={classes.bannerContent}>
      <div className={classes.cryptoContent}>
      <Typography variant='h2' style={{
        fontFamily : "Montserrat",
        fontWeight : "bold",
         marginBottom: 15,
     }}>
      Crypto Hunter
     </Typography>
     <Typography variant='subtitle2' style={{
       color:"darkgray",
       textTransform:"capitalize",
       fontFamily:"Montserrat"
     }}>
       Get all info regarding your favorite crypto currency
     </Typography>
      </div>
      <Carousel/>
     </Container>
    </div>
  )
}

export default Banner;