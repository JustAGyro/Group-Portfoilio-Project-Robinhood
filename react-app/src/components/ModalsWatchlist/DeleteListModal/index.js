import React, { useState, useEffect, useRef } from "react";
import { useModal } from "../../../context/Modal";
import "./deletelistmodal.css"
import { deleteWatchlistThunk, getAllWatchlistsThunk, deleteSymbollistThunk } from "../../../store/watchlist";
import { useDispatch } from "react-redux";
export default function DeleteWatchListModal({  id, name, len }) {
    const dispatch = useDispatch()
    // const modalRef = useRef(null);
    const {closeModal} = useModal()

    const onDeleteHandle =  () => {
        dispatch(deleteWatchlistThunk({
            id: id
        }))
        dispatch(deleteSymbollistThunk({
            
        }))
        closeModal()
        // dispatch(getAllWatchlistsThunk())
    }

    return (
            <div id="det-wat-lst-modalContainer">
                <div className="wat-lst-del-mod-headr">
                    <p>Are you sure you want to delete "{name}" list ?</p>
                    {/* <h1>Confirm Delete</h1> */}
                    <button onClick={() => closeModal()}> X </button>
                </div>
                <div className="wat-lst-del-mod-bod">
                    
                    <p>if you delete this list and its {len} items, it'll be gone forever!</p>
                    <div>

                        <button onClick={onDeleteHandle}>Delete {name}</button>
                        
                    </div>

                </div>
                
            </div>
       


    )
}