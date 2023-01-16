import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { Crypto } from '../../context/CryptoContext'
import axios from 'axios';
import { TrendingCoins } from '../../config/Api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },

  carouselItem: {
    display: "flex",
    // height:"50%",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white"
  }
}))

const Carousel = () => {
  const { currency, symbol } = useContext(Crypto);
  const [trending, setTrending] = useState([]);

  const classes = useStyles();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    // setTrending(data);
  }
  // console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);



  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    }
  }

  const numberFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }} />
        <span>
          {coin?.symbol}
          &nbsp;
          <span style={{
            color: profit > 0 ? "rgb(144 , 203 , 129)" : "red",
          }}>
            {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol}{numberFormat(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableButtonsControls
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
      />

    </div>
  )
}

export default Carousel;