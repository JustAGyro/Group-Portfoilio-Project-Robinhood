import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Graph from "../Graph"
import { addStock } from "../../store/stocks";

export default function StockApi () {
    const dispatch = useDispatch()
    const [stuff, setStuff] = useState({})
    const [symbol, setSymbol] = useState("")
    let fav = useSelector(state => state.stocks[symbol])
    let initialData =   [
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 },
    ];
    useEffect(() =>{
        initialData = fav
    }, [stuff])
    const getIt = async () => {
        let it = await fetch(`/api/stocks/historical_daily/${symbol}`)

        return await it.json()
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        let them = await getIt()
        await dispatch(addStock(them))
        let final = fav.map( ele => {
            return {
                time: ele.date,
                value: ele.close
            }
        })
        console.log(fav)
        setStuff(final)
    }
    return (
    <div>
         <div>
            <form method="GET" onSubmit={onSubmit}>
                <div>
                    <input
                    type="text"
                    name="symbol"
                    onChange={e => setSymbol(e.target.value)}
                    value={symbol}
                    />
                </div>
                <div>
                    <button type="submit"> submit </button>
                </div>
            </form>
        </div>
            <Graph data={initialData} symbol={symbol}/>
    </div>
    )
}
