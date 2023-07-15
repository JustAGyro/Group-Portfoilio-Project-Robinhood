import React, { useState, useEffect, useRef } from "react";
import "./addtolist.css"
import { createWatchlistThunk, getAllWatchlistsThunk } from "../../../store/watchlist";
import { createSymbollistThunk, deleteSymbollistThunk } from "../../../store/watchlist";

import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
export default function AddToListModal({ symbol }) {
    const dispatch = useDispatch()
    const modalRef = useRef(null);
    const {closeModal} = useModal()
    const [error, setError] = useState(false)
    let watchlists = useSelector(state => state?.watchlists)
    watchlists = Object.values(watchlists)
    // useEffect(() => {
    //     if watchlists.symbol
    // })
    const addToList = async (listId, listSymbol) => {
        if (error) {
            return
        } 
        // setSymbolToAdd(listSymbol)
        // if (symbolToAdd)
        setError(true)
        await dispatch(createSymbollistThunk(listId, listSymbol))
        await dispatch(getAllWatchlistsThunk())
        closeModal()
    }
    const removeFromList = async (listId, symbolListId) => {
        setError(false)
        await dispatch(deleteSymbollistThunk(listId, symbolListId))
        await dispatch(getAllWatchlistsThunk())
        closeModal()
    }
    return (
        <div>
            
            <div ref={modalRef} id="wat-lst-modalContainer">
                <div className="add-list-header">
                    <p>Add {symbol} to Your Lists</p>
                    <button onClick={() => closeModal()}> X </button>
                </div>
                <div className="add-list-mod-bod">
                    {watchlists.map(element => {
                        return (
                            <div className="add-list-mod-bod-content">

                                <p><i class="fa-solid fa-bolt"></i>  {element.name} </p>
                                {element['symbols'].map(ele => {
                                    if (ele.symbol === symbol) {
                                        return <button className="add-list-mod-rem" onClick={() => removeFromList(element.id, ele.id)}>Remove from list</button>
                                    }

                                })}
                                {element['symbols'].every(ele => ele.symbol !== symbol) && (
                                    <button className="add-list-mod-add" onClick={() => addToList(element.id, symbol)}>Add to list</button>
                                )}
                            </div>

                        )
                    })}
                </div>
                {/* <div className="footer">
                    <button onClick={() => closeModal()}>Save Changes</button>
                </div> */}
            </div>
        </div>


    )
}