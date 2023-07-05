import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetHistoricalHour } from "../../store/stocks";
// import Graph from "./GraphWatchlist"
import GraphWatchlist from "./GraphWatchlist";

export default function WatchlistGraph(props) {
    const dispatch = useDispatch()
    const [stockHour, setStockHour] = useState([])
    const [lastPrice, setLastPrice] = useState('') // most recent price
    const [prevPrice, setPrevPrice] = useState(0)
    const [valueDown, setValueDown] = useState(false)
    // const [difference, setDifference] = useState('')

    function calculatePercentDifference(lastPrice, prevPrice) {
        var difference = lastPrice - prevPrice;
        console.log(difference, '-----------this is difference')
        var percentDifference = (difference / lastPrice) * 100;
        // setDifference(percentDifference)
        // setDifference
        return percentDifference;
    }
    useEffect(() => {
        const parseHistorical = async () => {
            const historicalHour = await dispatch(GetHistoricalHour(props.symbol))
            console.log(historicalHour, '------------from the store')
            setStockHour(historicalHour)
            setLastPrice(historicalHour[23].value)
            setPrevPrice(historicalHour[16].value)
            if (historicalHour[23].value < historicalHour[16].value) {
                setValueDown(true)
            }
            return historicalHour

        }


        parseHistorical()
        calculatePercentDifference()

    }, [])
    console.log(stockHour, '-----------------')
    console.log(lastPrice)
    console.log(prevPrice)
    console.log(valueDown)
    const percentDifference = calculatePercentDifference(lastPrice, prevPrice);
    let color = 'green'
    if (percentDifference < 0) {
        color = 'red'
    }
    
    // if (percentDifference == NaN) 
    // setDifference(percentDifference)
    console.log('Percent Difference:', percentDifference);




    return (
        <>

           
            <div style={{display: "flex"}}>
                <div>

                    <GraphWatchlist {...props} data={stockHour} lineColor = {color} />
                </div>

                <p>{lastPrice}</p>
                {isNaN(percentDifference) ? null : <p>{percentDifference.toFixed(3)}</p>}
            </div>
        </>

    )
}