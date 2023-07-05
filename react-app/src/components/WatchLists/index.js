import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import WatchListModal from "../ModalsWatchlist/ShowListModal";
import DeleteWatchListModal from "../ModalsWatchlist/DeleteListModal";
import { getAllWatchlistsThunk, getOneWatchlistThunk, createWatchlistThunk, deleteWatchlistThunk, createSymbollistThunk, deleteSymbollistThunk } from "../../store/watchlist";
import WatchlistGraph from "../WatchlistGraphs";
import './watchlist.css'

export default function WatchLists() {
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    let watchlists = useSelector(state => state?.watchlists)
    watchlists = Object.values(watchlists)
    console.log(watchlists, '-----------watchlists state flag---------------')

    useEffect(() => {
        dispatch(getAllWatchlistsThunk())
    }, [dispatch])
    return (

        <>
            <div>
                <div>
                    {watchlists.map(ele => {
                        return (
                            <div>
                                <div> 
                                    <p>Lists</p>
                                    <p> add </p>
                                </div>
                                <div>
                                    list_name: {ele.name}
                                    <p>open</p>
                                </div>
                                {ele['symbols'].map(ele => {
                                    return (
                                        <div>
                                            {ele.symbol}
                                            <WatchlistGraph symbol = {ele.symbol} />
                                        </div>
                                    )
                                })}
                                <button onClick={() => {setDeleteModal(true)}}>Delete</button>
                                {deleteModal && <DeleteWatchListModal closeModal = {setDeleteModal} id = {ele.id} />}
                            </div>
                        )
                    })}

                </div>
                <div>
                    <button className="openModalBtn" onClick={() => { setOpenModal(true) }}>create list</button>
                    {openModal && <WatchListModal closeModal={setOpenModal} />}
                </div>

            </div>
        </>
    )
}