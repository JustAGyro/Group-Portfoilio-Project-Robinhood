import React, { useState, useEffect, useRef } from "react";
import "./addtolist.css"
import { createWatchlistThunk, getAllWatchlists } from "../../../store/watchlist";
import { useDispatch, useSelector } from "react-redux";
export default function AddToListModal({ closeModal, symbol }) {
    const dispatch = useDispatch()
    const modalRef = useRef(null);
    let watchlists = useSelector(state => state?.watchlists)
    watchlists = Object.values(watchlists)
    console.log(watchlists, '----------------list of watchlists')
    useEffect(() => {
        // below function is listner for click if click is outside the refrence it will close the modal
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [closeModal]);
    const addToList = () => {
        
    }
    return (
        <div id="wat-lst-modal-background">
            <div ref={modalRef} id="wat-lst-modalContainer">
                <div className="title">
                    <h1>Add {symbol} to Your Lists</h1>
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div>
                    {watchlists.map(element => {
                        return (
                            <div>

                                <div> {element.name} </div>
                                {element['symbols'].map(ele => {
                                    if (ele.symbol === symbol) {
                                        return <button>Remove from list</button>
                                    }

                                })}
                                {element['symbols'].every(ele => ele.symbol !== symbol) && (
                                    <button>Add to list</button>
                                )}
                            </div>

                        )
                    })}
                </div>
                <div className="footer">
                    <button onClick={() => closeModal(false)}>Save Changes</button>
                    {/* <button>Create List</button> */}
                </div>
            </div>
        </div>


    )
}