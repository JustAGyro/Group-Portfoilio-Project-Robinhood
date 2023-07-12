import React, { useState, useEffect, useRef } from "react";
import "./editlistmodal.css"
import { createWatchlistThunk, editListThunk, getAllWatchlists } from "../../../store/watchlist";
import { useDispatch, useSelector } from "react-redux";
export default function EditListName({ closeModal, id, name }) {
    const dispatch = useDispatch()
    const modalRef = useRef(null);
    const [listName, setListName] = useState(name)
    console.log (listName)
    console.log (id)
    let watchlists = useSelector(state => state?.watchlists)
    watchlists = Object.values(watchlists)
    // console.log(watchlists, '----------------list of watchlists')
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
    const submit  = async (e) => {
        e.preventDefault();
        if (listName) await dispatch (editListThunk(id, {
          name: listName
        }))
        // dispatch()
        closeModal(false)
      }
    return (
        <div id="wat-lst-modal-background">
            <div ref={modalRef} id="wat-lst-modalContainer">
                <div className="title">
                    <h1>Edit List</h1>
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div>
                    <form onSubmit={submit} method="PUT" action={`/api/watchlists/${id}/edit`}>
                        <div>
                    <input value={listName} onChange={(e) => setListName(e.target.value)}/>

                    <button type="submit">Save</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>


    )
}