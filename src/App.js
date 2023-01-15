import React from 'react'
import { makeStyles } from '@mui/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoinPage from './pages/CoinPage';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css'
const App = () => {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      // minHeight: '200vh',
      color: 'white',
    }
  }))
  const classes = useStyles();
  return (
    <div style={{height:"100%"}}>
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  )
}

export default App;
