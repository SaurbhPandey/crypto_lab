

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
                    <Typography variant="h5" style={{textAlign:'center' ,fontFamily:"Montserrat"}} >
                        Crypto Currencies According To Market Cap
                    </Typography>
                    <TextField name = 'text' onChange= {(e)=>setText(e.target.value)} value={text} id="outlined-basic" label="Search Crypto Currency" variant="outlined" fullWidth style={{marginTop:'2%', marginBottom:'2%'}} />
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow style={{background:'gold'}}>
                                    <TableCell className={classes.th} style={{textAlign:'left',fontFamily:"Montserrat"}}  >Coin</TableCell>
                                    <TableCell className={classes.th} align='right' style={{fontfamily:"Montserrat"}}>Price</TableCell>
                                    <TableCell className={classes.th} align='right' style={{fontfamily :"Montserrat"}}>24 Change</TableCell>
                                    <TableCell className={classes.th} style={{textAlign:'center', fontfamily:"Montserrat"}}>Market Cap</TableCell>
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
                                                    <div style={{display:'flex', flexDirection:'column', marginLeft:'5%', fontSize:'17px', textAlign:'Left'}}>
                                                        <span>{coin.symbol.toUpperCase()}</span>
                                                        <span style={{fontSize:'14px', color:'gray'}}>{coin.name}</span>
                                                    </div>
                                                </div>
                                                </TableCell>
                                                <TableCell align='right' style={{fontSize:'17px'}} >
                                                    <span>{symbol}{numberWithCommas(coin.current_price)}</span>
                                                </TableCell>
                                                <TableCell align='right' >
                                                    <span style={{color:coin.price_change_percentage_24h<0?'red':'#21c43a', fontSize:'17px'}} >{coin.price_change_percentage_24h>=0&&"+"}{(coin.price_change_percentage_24h?.toFixed(2))}%</span>
                                                </TableCell>
                                                <TableCell style={{fontSize:'17px', textAlign:'center'}} >
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
