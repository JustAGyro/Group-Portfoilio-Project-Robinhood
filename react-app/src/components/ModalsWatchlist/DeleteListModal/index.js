import React, { useState, useEffect, useRef } from "react";
import "./deletelistmodal.css"
import { deleteWatchlistThunk, getAllWatchlistsThunk, deleteSymbollistThunk } from "../../../store/watchlist";
import { useDispatch } from "react-redux";
export default function DeleteWatchListModal({ closeModal, id, name, len }) {
    const dispatch = useDispatch()
    const modalRef = useRef(null);


    useEffect(() => {
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
    const onDeleteHandle =  () => {
        dispatch(deleteWatchlistThunk({
            id: id
        }))
        dispatch(deleteSymbollistThunk({
            
        }))
        closeModal(false)
        // dispatch(getAllWatchlistsThunk())
    }

    return (
        <div id="del-wat-lst-modal-background">
            <div ref={modalRef} id="det-wat-lst-modalContainer">
                <div className="wat-lst-del-mod-headr">
                    <p>Are you sure you want to delete "{name.toUpperCase()}" list ?</p>
                    {/* <h1>Confirm Delete</h1> */}
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div className="wat-lst-del-mod-bod">
                    
                    <p>if you delete this list and its {len} items, it'll be gone forever!</p>
                    <div>

                        <button onClick={onDeleteHandle}>yes</button>
                        <button onClick={() => closeModal(false)}>No</button>
                    </div>

                </div>
                <div className="footer">
                    {/* <button>Create List</button> */}
                </div>
            </div>
        </div>


    )
}