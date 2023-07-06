import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactionsThunk } from "../../store/transactions";
import { getStock } from "../../store/stocks";
import Graph from "../Graph"

export default function Portfolio() {
    const dispatch = useDispatch()
    let transactions = useSelector(state => state?.transactions)
    let stocks = useSelector(state => state.stocks)
    const [byDate, setByDate] = useState({})
    const [dailyValue, setDailyValue] = useState([])
    useEffect(() => {
        dispatch(getAllTransactionsThunk())
    },[])
    useEffect(() => {
        let list = Object.values(transactions);
        let symbolList = [];
        list.forEach(ele => {
            console.log(ele)
            let newDate = byDate;
            let target = ele.date;
            if(!symbolList.includes(ele.symbol)){
                console.log("added", ele.symbol)
                symbolList.push(ele.symbol)
            }

            if(newDate[target] && newDate[target][ele.symbol]){
                console.log(ele.transaction)
                if(ele.transaction === "buy"){
                    newDate[target][ele.symbol] += ele.quantity
                }
                else{
                    newDate[target][ele.symbol] -= ele.quantity
                }
            }
            else{
                if(!newDate[target]){
                    newDate[target] = {};
                    newDate[target][ele.symbol] = ele.quantity
                }
                else{
                    newDate[target][ele.symbol] = ele.quantity;
                }

            }
            console.log("symbols", symbolList)
            symbolList.forEach(ele => {
                dispatch(getStock(ele))
            })
            setByDate(newDate)
        })
        console.log("TRANS",byDate)

    }, [transactions])
    return (
        <div>
            cahrt go here
        </div>
    )
}

//get portfolio transactions
//organize by symbol
//organize by date
//create array with objects inside that are {date:{the target date}, traded:[portfolio transactions on that date], held: {key, value pairs of stocksymbol: numstocksheld}, value: {the total value up to that point}}
