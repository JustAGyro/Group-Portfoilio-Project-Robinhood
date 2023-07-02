import React, { useState, useEffect, useRef } from "react";
import "./showlistmodal.css"
import { createWatchlistThunk, getAllWatchlists } from "../../../store/watchlist";
import { useDispatch } from "react-redux";
export default function WatchListModal({closeModal}) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
    const modalRef = useRef(null);
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
      const checkLength =  ( text) => {
        if (text.length > 0) {
          return false
        }
        return true
      }
      const submit  = async (e) => {
        e.preventDefault();
        if (name) await dispatch (createWatchlistThunk({
          name: name
        }))
        // dispatch()
        closeModal(false)
      }
    return (
        <div id="wat-lst-modal-background">
            <div ref={modalRef} id="wat-lst-modalContainer"> 
                <div className="title">
                    <h1>Create List</h1>
                <button onClick={() =>closeModal(false)}> X </button>
                </div>
                <div>
                    <p>Pick a name for your watchlist</p>
                    <form onSubmit={submit} method = 'POST' action="/api/watchlists/new">
                      <div>
                        name
                      <input placeholder="name" name = 'name' type='text' onChange = {e => setName(e.target.value)}value={name}/>
                      </div>
                      <button type="submit" disabled={checkLength(name)}>Create List</button>
                    </form>
                </div>
                <div className="footer">
                    <button onClick={() =>closeModal(false)}>Cancel</button>
                    {/* <button>Create List</button> */}
                </div>
            </div>
        </div>


    )
}