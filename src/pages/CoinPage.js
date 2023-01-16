import { LinearProgress, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/Api";
import { Crypto } from "../context/CryptoContext";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/CoinTable";
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(Crypto);

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  // const theme = useTheme();
  // const parse = require('html-react-parser');
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "2%",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          styles={{ marginBottom: 20 }}
        />
        <Typography variant="h3" style={{ fontFamily: "Montserrat" }}>
          {coin?.name}
        </Typography>
        {/* <Typography
          variant="subtitle1"
          style={{ fontFamily: "Montserrat", margin: "5%", fontSize: 24 }}
        >
          {coin?.description.en.split(".")[0]}.
        </Typography> */}
        <div>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              Rank :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              Current Price :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              Market Cap :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
