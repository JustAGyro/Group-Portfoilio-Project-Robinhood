import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGainers } from "../../store/stocks";

export default function Movers() {
    const dispatch = useDispatch();
    const [movers, setMovers] = useState([])

    useEffect(() => {
        const parseMovers = async () => {
            const movers = await dispatch(getGainers())
            // console.log("movers", movers)
            setMovers(movers);
            // console.log(movers)
            return movers
        }
        parseMovers()
    }, [])
    let parsed = []
    if(movers) {
        parsed = movers.map(ele => {
            return (
                <div class="movers-card">
                    <div class="movers-card-change">
                    change: {ele.change}
                    </div>
                    <div class="movers-card-changepercentage">
                    changesPercentage: {ele.changesPercentage}
                    </div>
                    <div class="movers-card-name">
                    name: {ele.name}
                    </div>
                    <div class="movers-card-price">
                    price: {ele.price}
                    </div>
                    <div class="movers-card-symbol">
                    symbol: {ele.symbol}
                    </div>
                    <div>

                    </div>
                </div>
            )

        })
    }

    return (
        <div>
            {parsed[0]}
            {parsed[1]}
            {parsed[2]}
            {parsed[3]}
            {parsed[4]}
        </div>
    )
}
