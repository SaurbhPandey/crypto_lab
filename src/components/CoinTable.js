// import {
//   Typography,
//   createTheme,
//   TableContainer,
//   LinearProgress,
//   TableHead,
//   TableRow,
//   TableCell,
//   Table,
//   TableBody,
//   TextField,
// } from "@mui/material";
// import Pagination from "@mui/material/Pagination";
// import { borderColor, color, Container, padding } from "@mui/system";
// import { ThemeProvider } from "@mui/styles";
// // import
// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { CoinList } from "../config/Api";
// import { Crypto } from "../context/CryptoContext";
// import "../App.css";
// import { makeStyles } from "@mui/styles";
// import Box from "@mui/material/Box";
// import InputBase from "@mui/material/InputBase";
// import { useNavigate } from "react-router-dom";

// export function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
// const CoinPage = () => {
//   const { currency, symbol } = useContext(Crypto);
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   // const [search, setSearch] = useState("");
//   const [pagination, setPagination] = useState(1);
//   const [allList, setAllList] = useState();
//   const coinFetchList = async () => {
//     setLoading(true);
//     const { data } = await axios.get(CoinList(currency));
//     setAllList(data);
//     setList(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     coinFetchList();
//   }, [currency]);

//   const darkTheme = createTheme({
//     palette: {
//       primary: {
//         main: "#fff",
//       },
//       type: "dark",
//     },
//   });

//   const useStyles = makeStyles(() => ({
//     inputBase: {
//       border: "1px solid white",
//       borderRadius: "10px",
//       padding: "10px",
//     },
//     row: {
//       backgroundColor: "#16171a",
//       cursor: "pointer",
//       "&:hover": {
//         backgroundColor: "#131111",
//       },
//       fontFamily: "Montserrat",
//     },
//     pagination: {
//       "& .MuiPaginationItem-root": {
//         color: "gold",
//       },
//     },
//   }));
//   const classes = useStyles();

//   // const handleSearch = () => {
//   //   return list.filter(
//   //     (coin) =>
//   //       coin.name.toLowerCase().includes(search) ||
//   //       coin.symbol.toLowerCase().includes(search)
//   //   );
//   // };
//   const handleChange = (e) => {
//     // setSearch(e.target.value);
//     // console.log(e.target.value)
//     // console.log(search)
//     // console.log(e);
//     const data = allList.filter(
//       (coin) =>
//         coin.name?.toLowerCase().includes(e.target.value) ||
//         coin.symbol?.toLowerCase().includes(e.target.value)
//     );
//     // console.log(data);
//     setList(data);
//   };
//   const navigate = useNavigate();
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Container style={{ textAlign: "center" }}>
//         <Typography
//           variant="h4"
//           style={{ margin: 18, fontFamily: "Montserrat", color: "white" }}
//         >
//           Cryptocurrency Prices by Market Cap
//         </Typography>
//         <Box
//           component="form"
//           sx={{
//             "& > :not(style)": { m: 1, width: "25ch" },
//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <InputBase
//             id="outlined-basic"
//             placeholder="Search for crypto currency..."
//             variant="outlined"
//             style={{
//               marginBottom: 20,
//               width: "100%",
//               color: "white",
//             }}
//             className={classes.inputBase}
//             // onChange={(e) => setSearch(e.target.value)}
//             onChange={handleChange}
//           />
//         </Box>
//         <TableContainer>
//           {loading ? (
//             <LinearProgress style={{ backgroundColor: "gold" }} />
//           ) : (
//             <Table>
//               <TableHead style={{ backgroundColor: "#EEBC1D" }}>
//                 <TableRow>
//                   {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
//                     <TableCell
//                       style={{
//                         color: "black",
//                         fontWeight: "700",
//                         fontFamily: "Montserrat",
//                       }}
//                       key={head}
//                       align={head === "Coin" ? "" : "right"}
//                     >
//                       {head}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {list.length == 0 ? (
//                   <Typography
//                     variant="h4"
//                     style={{
//                       margin: 18,
//                       fontFamily: "Montserrat",
//                       color: "white",
//                       display: "flex",
//                       alignItems: "center",
//                       marginTop: 20,
//                       justifyContent: "center",
//                     }}
//                   >
//                     The Coin Name You Enter Is Not Present
//                   </Typography>
//                 ) : (
//                   list
//                     .slice((pagination - 1) * 10, (pagination - 1) * 10 + 10)
//                     .map((row) => {
//                       const profit = row.price_change_percentage_24h > 0;
//                       return (
//                         <TableRow
//                           onClick={() => navigate(`/coins/${row.id}`)}
//                           className={classes.row}
//                           key={row.name}
//                         >
//                           <TableCell
//                             component="th"
//                             scope="row"
//                             style={{
//                               display: "flex",
//                               gap: 15,
//                             }}
//                           >
//                             <img
//                               src={row?.image}
//                               alt={row.name}
//                               height="50"
//                               style={{ marginBottom: 10 }}
//                             />
//                             <div
//                               style={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                               }}
//                             >
//                               <span
//                                 style={{
//                                   textTransform: "uppercase",
//                                   fontSize: 22,
//                                   color: "white",
//                                 }}
//                               >
//                                 {row.symbol}
//                               </span>
//                               <span style={{ color: "darkgrey" }}>
//                                 {row.name}
//                               </span>
//                             </div>
//                           </TableCell>
//                           <TableCell align="right" style={{ color: "white" }}>
//                             {symbol}{" "}
//                             {numberWithCommas(row.current_price.toFixed(2))}
//                           </TableCell>
//                           <TableCell
//                             align="right"
//                             style={{
//                               color: profit > 0 ? "rgb(14, 203, 129)" : "red",
//                               fontWeight: 500,
//                             }}
//                           >
//                             {profit && "+"}
//                             {row.price_change_percentage_24h.toFixed(2)}%
//                           </TableCell>
//                           <TableCell style={{ color: "white" }} align="right">
//                             {symbol}{" "}
//                             {numberWithCommas(
//                               row.market_cap.toString().slice(0, -6)
//                             )}
//                             M
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })
//                 )}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>
//         <Pagination
//           className={classes.pagination}
//           style={{
//             padding: 20,
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//           }}
//           count={(allList?.length / 10).toFixed(0)}
//           onChange={(_, value) => {
//             setPagination(value);
//             window.scroll(0, 450);
//           }}
//         />
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default CoinPage;

import { Container, TextField, ThemeProvider, createTheme, Typography, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { Crypto } from '../context/CryptoContext';
import { useContext } from 'react';
import { CoinList } from '../config/Api';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { useState } from 'react';
import { useEffect } from 'react';
export function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

const CoinsTable = () => {
    const [coins, setCoins] = useState([])
    const [text, setText] = useState("")
    const [page, setPage] = useState(1)
    const {currency, symbol} = useContext(Crypto)
    const theme = createTheme({
        palette: {
          primary: {
            main: '#ffff',
          },
          type:'dark'
        },
    })

    const navigate = useNavigate()
    
    useEffect(() => {
        const getList = async()=>{
            const {data} = await axios.get(CoinList(currency))
            console.log(data)
            setCoins(data)
        }
        getList()
    }, [currency]);

    const useStyles = makeStyles({
        th:{
            color:'black', fontSize:'20px', fontWeight:'bold', fontFamily:'Montserrat'
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
        },
    })

    const classes = useStyles()

    const handleSearch = ()=>{
        return coins.filter((coin)=>
            coin.name.toLowerCase().includes(text.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(text.toLowerCase())
        )
    }

    return(
        <>
            <ThemeProvider theme={theme}>
                <Container style={{marginTop:'3%', paddingBottom:'2%'}}>
                    <Typography variant="h5" style={{textAlign:'center'}} >
                        Crypto Currencies According To Market Cap
                    </Typography>
                    <TextField name = 'text' onChange= {(e)=>setText(e.target.value)} value={text} id="outlined-basic" label="Search Crypto Currency" variant="outlined" fullWidth style={{marginTop:'2%', marginBottom:'2%'}} />
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow style={{background:'gold'}}>
                                    <TableCell className={classes.th} style={{textAlign:'left'}}  >Coin</TableCell>
                                    <TableCell className={classes.th} align='right' >Price</TableCell>
                                    <TableCell className={classes.th} align='right' >24 Change</TableCell>
                                    <TableCell className={classes.th} style={{textAlign:'center'}}>Market Cap</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((coin)=>{
                                        return(
                                            <TableRow key={coin.name} style={{cursor:'pointer'}} className={classes.row} onClick = {()=>navigate(`/coins/${coin.id}`)}>
                                                <TableCell style={{textAlign:'center',marginRight:'2%'}}>
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <img
                                                        src={coin.image}
                                                        alt={coin.name}
                                                        width="75px"
                                                    />
                                                    <div style={{display:'flex', flexDirection:'column', marginLeft:'5%', fontSize:'25px', textAlign:'Left'}}>
                                                        <span>{coin.symbol.toUpperCase()}</span>
                                                        <span style={{fontSize:'20px', color:'gray'}}>{coin.name}</span>
                                                    </div>
                                                </div>
                                                </TableCell>
                                                <TableCell align='right' style={{fontSize:'25px'}} >
                                                    <span>{symbol}{numberWithCommas(coin.current_price)}</span>
                                                </TableCell>
                                                <TableCell align='right' >
                                                    <span style={{color:coin.price_change_percentage_24h<0?'red':'#21c43a', fontSize:'25px'}} >{coin.price_change_percentage_24h>=0&&"+"}{(coin.price_change_percentage_24h)}</span>
                                                </TableCell>
                                                <TableCell style={{fontSize:'25px', textAlign:'center'}} >
                                                    <span>{symbol}{numberWithCommas(coin.market_cap.toString().slice(0, -6))}{"M"}</span>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={parseInt((handleSearch().length / 10).toFixed(0))}
                        style={{
                            padding: 20,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                        onChange={(_, value) => {
                            setPage(value);
                            window.scroll(0, 450);
                        }}
                        className={classes.pagination}
                    />
                </Container>
            </ThemeProvider>
        </>
    )
};

export default CoinsTable;
