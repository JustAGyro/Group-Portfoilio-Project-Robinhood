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
            <div className="wat-lst-mn-ctn">
                <div className="wat-lst-header">
                    <p>
                        Lists
                    </p>
                    <div>
                        <button className="openModalBtn" onClick={() => { setOpenModal(true) }}><i class="fa-solid fa-plus"></i></button>
                        {openModal && <WatchListModal closeModal={setOpenModal} />}
                    </div>


                </div>
                <div>
                    {watchlists.map(ele => {
                        return (
                            <div className="wat-lst-pri-cont">
                                <div className="wat-lst-bod-head">
                                    <p>{ele['name'].toUpperCase()}</p>
                                    <p><i class="fa-solid fa-sort-down"></i></p>
                                </div>
                                {ele['symbols'].map(ele => {
                                    return (
                                        <div className="wat-lst-bod-bod">
                                            <p>{ele.symbol}</p>
                                            <WatchlistGraph symbol={ele.symbol} />
                                        </div>
                                    )
                                })}
                                <button onClick={() => { setDeleteModal(true) }}>Delete</button>
                                {deleteModal && <DeleteWatchListModal closeModal={setDeleteModal} id={ele.id} />}
                            </div>
                        )
                    })}

                </div>
                <div>
                    {/* <button className="openModalBtn" onClick={() => { setOpenModal(true) }}>create list</button>
                    {openModal && <WatchListModal closeModal={setOpenModal} />} */}
                </div>

            </div>
        </>
    )
}