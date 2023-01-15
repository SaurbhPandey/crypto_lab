import { Typography, createTheme, TableContainer, LinearProgress, TableHead, TableRow, TableCell, Table, TableBody, TextField, } from '@mui/material'
import Pagination from '@mui/material/Pagination';
import { borderColor, color, Container, padding } from '@mui/system'
import { ThemeProvider } from '@mui/styles'
// import
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CoinList } from '../config/Api'
import { Crypto } from '../context/CryptoContext'
import '../App.css'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinPage = () => {
  const { currency ,symbol} = useContext(Crypto);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [search, setSearch] = useState("");
  const[pagination , setPagination] = useState(1);
  const[allList , setAllList] = useState();
  const coinFetchList = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setAllList(data);
    setList(data);
    setLoading(false);
  }

  useEffect(() => {
    coinFetchList()
  }, [currency]);


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark",
    }
  });

  const useStyles = makeStyles(() => ({
    inputBase: {
      border: "1px solid white",
      borderRadius: "10px",
      padding: "10px"
    },
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    }
  }));
  const classes = useStyles();

  // const handleSearch = () => {
  //   return list.filter(
  //     (coin) =>
  //       coin.name.toLowerCase().includes(search) ||
  //       coin.symbol.toLowerCase().includes(search)
  //   );
  // };
  const handleChange = (e)=>{
    // setSearch(e.target.value);
    // console.log(e.target.value)
    // console.log(search)
    console.log(e);
    const data = allList.filter(
      (coin) =>
        coin.name?.toLowerCase().includes(e.target.value) ||
        coin.symbol?.toLowerCase().includes(e.target.value)
    );
    setList(data);
  }
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat", color: "white" }}

        >
          Cryptocurrency Prices by Market Cap

        </Typography>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <InputBase id="outlined-basic" placeholder="Search for crypto currency..." variant='outlined' style={{
            marginBottom: 20,
            width: "100%",
            color: "white"
          }} className={classes.inputBase}
            // onChange={(e) => setSearch(e.target.value)}
            onChange={handleChange}
          />

        </Box>
        <TableContainer>
          {
            loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}>
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list.length == 0 ? <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat", color: "white" , display:"flex" , alignItems:"center",
        marginTop:20 , justifyContent:"center" }}

        >
          The Coin Name You Enter Is Not Present

        </Typography>: list.slice((pagination-1)*10,(pagination-1)*10+10).map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                      onClick={() => navigate("/coins/${row.id}")}
                      className={classes.row}
                      key={row.name}
                    >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                           <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color:"white"
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{color : "white"}} >
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell style={{color : "white"}} align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )
          }
        </TableContainer>
        <Pagination className={classes.pagination} style={{
          padding : 20,
          width:"100%",
          display:"flex",
          justifyContent : "center"
        }}
        count={(allList?.length / 10).toFixed(0)}
        onChange={(_,value)=>{
          setPagination(value);
          window.scroll(0,450);
        }}/>
      </Container>
    </ThemeProvider>
  )
}

export default CoinPage;