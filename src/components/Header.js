import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Container } from '@mui/system';
import { createTheme, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Crypto } from '../context/CryptoContext';
import { useContext } from 'react';
import '../App.css'
const Header = () => {
  const useStyles = makeStyles(() => ({
    title: {
      flex: "1",
      color: "gold",
      fontFamily:"Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  

  }))


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#e3f2fd",
      },
      type: "dark"
    },
  });
  const classes = useStyles();

  // useNavigate hook to redirect to the home page
  const navigate = useNavigate()

  // context api 
  const{currency , setCurrency , symbol} = useContext(Crypto);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <AppBar color='transparent' position='static'>
          <Container>
            <Toolbar>
              <Typography onClick={() => navigate("/")} className={classes.title} variant='h6' 
              style={{
                fontFamily:"Montserrat",
                fontWeight:"bold"
                }}>
                Crypto Lab</Typography>
              <Select variant='outlined'
                style={{
                  width: 100,
                  height: 40,
                  marginRight: 15,
                  color:"white",
                  border:"1px solid white",
                  backgroundColor : "slategray"
                }}
                value = {currency} 
                onChange={(e) =>{setCurrency(e.target.value)}}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  )
}

export default Header;