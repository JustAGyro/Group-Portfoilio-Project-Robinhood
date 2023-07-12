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
            <div ref={modalRef} id="cre-wat-lst-modalContainer"> 
                <div className="cre-wat-mod-hed">
                    <p>Create List</p>
                <button onClick={() =>closeModal(false)} className="cre-wat-mod-hed-can"> X </button>
                </div>
                <div>
                    <form onSubmit={submit} method = 'POST' action="/api/watchlists/new">
                      <div className="wat-lst-cre-mod-bod">
                      <input placeholder="List Name" name = 'name' type='text' onChange = {e => (setName(e.target.value))} value={name}/>
                      </div>
                      <div className="cre-wat-lst-mod-btns">
                        <button onClick={() =>closeModal(false)} className="cre-lst-mod-cancel-btn">Cancel</button>
                      <button 
                       
                       className="cre-lst-mod-btn" type="submit" disabled={checkLength(name)}>Create List</button>
                      </div>
                    
                    </form>
                </div>
                <div className="cre-wat-mod-footer">
                    {/* <button>Create List</button> */}
                </div>
            </div>
        </div>


    )
}