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
    let watchlists = useSelector(state => state?.watchlists)
    watchlists = Object.values(watchlists)
    const addToList = async (listId, listSymbol) => {
        // setSymbolToAdd(listSymbol)
        // if (symbolToAdd)
        await dispatch(createSymbollistThunk(listId, listSymbol))
        await dispatch(getAllWatchlistsThunk())
        closeModal()
    }
    const removeFromList = async (listId, symbolListId) => {
        await dispatch(deleteSymbollistThunk(listId, symbolListId))
        await dispatch(getAllWatchlistsThunk())
        closeModal()
    }
    return (
        <div>
            
            <div ref={modalRef} id="wat-lst-modalContainer">
                <div className="title">
                    <h1>Add {symbol} to Your Lists</h1>
                    <button onClick={() => closeModal()}> X </button>
                </div>
                <div>
                    {watchlists.map(element => {
                        return (
                            <div>

                                <div> {element.name} </div>
                                {element['symbols'].map(ele => {
                                    if (ele.symbol === symbol) {
                                        return <button onClick={() => removeFromList(element.id, ele.id)}>Remove from list</button>
                                    }

                                })}
                                {element['symbols'].every(ele => ele.symbol !== symbol) && (
                                    <button onClick={() => addToList(element.id, symbol)}>add to list</button>
                                )}
                            </div>

                        )
                    })}
                </div>
                <div className="footer">
                    <button onClick={() => closeModal()}>Save Changes</button>
                    {/* <button>Create List</button> */}
                </div>
            </div>
        </div>


    )
}