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
    const [quantity, setQuantity] = useState(0)
    const [symbol, setSymbol] = useState("")
    const [fin ,setFin] = useState({transaction, quantity, symbol})

    useEffect(() => {
        setFin({transaction, quantity, symbol})
    }, [transaction, quantity, symbol])
    const submit = async (e) => {
        e.preventDefault();
        if(transaction && quantity && symbol){
            await dispatch(createTransactionThunk(fin));
            history.push(`/transactions`)
        }
    }
    return (
        <div>
            <form onSubmit={submit}>
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
                            value={"Buy"}
                            >
                                Buy
                            </option>
                            <option
                            key={"Sell"}
                            value={"Sell"}
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
                        <button type='submit'> submit </button>
                    </div>
                </div>

            </form>
        </div>
    )
}
