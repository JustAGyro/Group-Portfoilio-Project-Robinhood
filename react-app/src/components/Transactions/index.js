import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createTransactionThunk, getAllTransactionsThunk } from "../../store/transactions";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default function Transactions() {
    const dispatch = useDispatch()
    let transactions = useSelector(state => state?.transactions)
    transactions = Object.values(transactions).map(obj => {
        return Object.values(obj)
    })
    console.log(Object.values(Object.values(transactions)))
    useEffect(() => {
        dispatch(getAllTransactionsThunk())
    },[])

    return (
        <div>
            {transactions.map(arr => {
                return (
                    <div>
                        {`${arr}`}
                    </div>
                )
            })}
        </div>
    )
}
export function NewTransaction() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [transaction, setTransaction] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [symbol, setSymbol] = useState("")
    const [fin ,setFin] = useState({transaction, quantity, symbol, price})

    useEffect(() => {
        setFin({transaction, quantity, symbol, price})
    }, [transaction, quantity, symbol, price])
    const submit = async (e) => {
        e.preventDefault();
        if(transaction && quantity && symbol && price){
            await dispatch(createTransactionThunk(fin));
            history.push(`/transactions`)
        }
    }
    return (
        <div>
            <form onSubmit={submit} method="POST" action={'/api/transactions/new'}>
                <div>
                    <label>
                        <select
                        name="transaction"
                        onChange={ e => setTransaction(e.target.value)}
                        value={transaction}
                        >
                            <option
                            key={"NA"}
                            value={""}
                            >
                                Pick an Option
                            </option>
                            <option
                            key={"Buy"}
                            value={"buy"}
                            >
                                Buy
                            </option>
                            <option
                            key={"Sell"}
                            value={"sell"}
                            >
                                Sell
                            </option>
                        </select>
                    </label>
                    <div>
                        <label>
                            <input
                            placeholder="1"
                            type="number"
                            name="quantity"
                            onChange={e => setQuantity(e.target.value)}
                            value={quantity}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                            type="text"
                            name="symbol"
                            onChange={e => setSymbol(e.target.value)}
                            value={symbol}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                            placeholder="1"
                            type="number"
                            name="price"
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                            />
                        </label>
                    </div>
                    <div>
                        <button type='submit'> submit </button>
                    </div>
                </div>
            </form>


        </div>
    )
}
