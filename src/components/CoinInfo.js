// import { CircularProgress } from "@mui/material";
// import { makeStyles, ThemeProvider } from "@mui/styles";
// import { createTheme, width } from "@mui/system";
// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { HistoricalChart } from "../config/Api";
// import { Crypto } from "../context/CryptoContext";
// import {chartDays} from '../config/daysData';
// import {Button} from "@mui/material";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js'
// import { Line } from 'react-chartjs-2'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// )
// const CoinInfo = (coin) => {
//   // const[historicData , setHistoricData] = useState();
//   // const{currency} = useContext(Crypto);
//   // const[days , setDays] = useState(1);

//   const [historicData, setHistoricData] = useState();
//   const [days, setDays] = useState(1);
//   const { currency } = useContext(Crypto);
//   const [flag, setflag] = useState(false);
//     // console.log(coin.coin.id );
//     // console.log(coin);
  
//   const fetchHistoricData = async () => {
//     const { data } = await axios.get(HistoricalChart(coin.coin.id, days, currency));
//     // console.log(data.prices);
    
//     setflag(true);
//     setHistoricData(data.prices);
//   };

//   // console.log(coin);

//   useEffect(() => {
//     fetchHistoricData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [days,currency]);

//   const darkTheme = createTheme({
//     palette: {
//       primary: {
//         main: "fff",
//       },
//       type: "dark",
//     },
//   });

//   const useStyles = makeStyles(() => ({
//     container: {
//       width: "100%",
//       display: "flex",
//       alignItems: "center",
//       flexDirection: "column",
//       justifyContent: "center",
//       marginTop: 25,
//       padding: 40,
//     },
//   }));

//   const classes = useStyles();
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <div className={classes.container}>
//         {!historicData ? (
//           <CircularProgress
//             style={{ color: "gold" }}
//             size={250}
//             thickness={1}
//           />
//         ) : (
//           <>
//              <div style={{padding:'2%', alignText:'center', width:"90%"}}>
//             <Line
//               data={{
//                 labels:historicData.map((coin)=>{
//                   let date = new Date(coin[0])
//                   let time = date.getHours()>12? 
//                   `${date.getHours() - 12}:${date.getMinutes()} PM`
//                   : `${date.getHours()}:${date.getMinutes()} AM`;
//                   return days === 1 ? time : date.toLocaleDateString();
//                 }),
//                 datasets:[
//                   {
//                     data:historicData.map((coin)=>{
//                       return coin[1]
//                     }),
//                     label: `Price ( Past ${days} Days ) in ${currency}`,
//                     borderColor: "#EEBC1D",
//                   }
//                 ]
//               }}
//               options= {{
//                 elements: {
//                   point: {
//                     radius: 1,
//                   },
//                 },
//               }}
//             />
//           </div>
//           <div style={{marginTop:'2%', display: 'flex', flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-evenly', paddingBottom:'5%', alignItems: 'center'}}>
//             {
//               chartDays.map((dD)=>{
//                 return <Button variant="outlined" color="primary" style={{backgroundColor:'#EEBC1D', color:'black', fontWeight:'bold', fontSize:'25px' , fontFamily:'Roboto', width:'200px', height:'70px', marginTop:'2%',  }} value={dD.value} onClick={()=>setDays(dD.value)} >
//                   {dD.label}
//                 </Button>
//               })
//             }
//           </div>
        
            
//           </>
//         )}
//       </div>
//     </ThemeProvider>
//   );
// };

// export default CoinInfo;
import axios from 'axios';
import React, { useEffect, useState , useContext} from 'react';
import { Crypto } from '../context/CryptoContext';
import { HistoricalChart } from '../config/Api';
import { CircularProgress, Button, createTheme, ThemeProvider } from '@material-ui/core';
import {chartDays} from '../config/daysData'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});


const CoinInfo = ({coin}) => {

    const [days, setDays] = useState(1)
    const [historicalData, setHistoricalData] = useState()
    const {currency} = useContext(Crypto);
    
    useEffect(() => {
        const Data = async ()=>{
            const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
            console.log(data)
            setHistoricalData(data.prices)
        }
        Data()
    }, [coin.id, days, currency]);
    
    if(!historicalData)
        return <CircularProgress
            style={{color:'gold'}}
            thickness={1}
            size={250}
        />
    return (
      <ThemeProvider theme={darkTheme}>
        <>
          <div style={{padding:'2%', alignText:'center'}}>
            <Line
              data={{
                labels:historicalData.map((coin)=>{
                  let date = new Date(coin[0])
                  let time = date.getHours()>12? 
                  `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets:[
                  {
                    data:historicalData.map((coin)=>{
                      return coin[1]
                    }),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  }
                ]
              }}
              options= {{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </div>
          <div style={{marginTop:'2%', display: 'flex', flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-evenly', paddingBottom:'5%', alignItems: 'center'}}>
            {
              chartDays.map((dD)=>{
                return <Button variant="outlined" color="primary" style={{backgroundColor:'#EEBC1D', color:'black', fontWeight:'bold', fontSize:'25px' , fontFamily:'Roboto', width:'200px', height:'70px', marginTop:'2%',  }} value={dD.value} onClick={()=>setDays(dD.value)} >
                  {dD.label}
                </Button>
              })
            }
          </div>
        
        </>
      </ThemeProvider>
    )
};

export default CoinInfo;