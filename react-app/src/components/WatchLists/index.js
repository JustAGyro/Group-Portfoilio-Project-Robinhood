
// -----------------------------------------------------------------------
import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
// import WatchListModal from "../ModalsWatchlist/CreateListModal";
import WatchListModal from "../ModalsWatchlist/CreateListModal";
import OpenModalButton from "../OpenModalButton";
import DeleteWatchListModal from "../ModalsWatchlist/DeleteListModal";
import EditListName from "../ModalsWatchlist/EditListModal";
import { getAllWatchlistsThunk, getOneWatchlistThunk, createWatchlistThunk, deleteWatchlistThunk, createSymbollistThunk, deleteSymbollistThunk } from "../../store/watchlist";
import WatchlistGraph from "../WatchlistGraphs";
import './watchlist.css'
// import OpenModalButton from "../OpenModalButton";

export default function WatchLists() {
    const dispatch = useDispatch()
    // const [openModal, setOpenModal] = useState(false)
    // const [deleteModal, setDeleteModal] = useState(false)
    // const [editListModal, setEditListModal] = useState(false)
    const [selectedWatchlist, setSelectedWatchlist] = useState(null)
    const ref = useRef(null)
    const history = useHistory()

  let watchlists = useSelector((state) => state?.watchlists);
  const user = useSelector((state) => state.session.user);
  watchlists = Object.values(watchlists);



    useEffect(() => {
        dispatch(getAllWatchlistsThunk())
    }, [dispatch])
    // to close delete and edit option if clicked anywhere on the page
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setSelectedWatchlist(null);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleOptionsClick = (watchlistId) => {
        if (selectedWatchlist === watchlistId) {
            setSelectedWatchlist(null);
        } else {
            setSelectedWatchlist(watchlistId);
        }
    }

    if (!user) {
        history.push('/')
        return null
    }
  ;
  // upon loggin out returns back to home
  if (!user) {
    history.push('/');
    return null;
  }

    return (
        <>
            <div className="wat-lst-mn-ctn" ref={ref}>
                <div className="wat-lst-header">
                    <p>
                      Lists
                    </p>
                    <div>
                        <button className="cre-wat-lst-plus-btn">
                            <OpenModalButton
                                buttonText={<i class="fa-solid fa-plus"></i>}
                                modalComponent={
                                    <WatchListModal />
                                }
                            />
                        </button>
                    </div>
                </div>
                <div>
                    {watchlists.map(element => {
                        return (
                            <div className="wat-lst-pri-cont">
                                <div className="wat-lst-bod-head">
                                    <p><i class="fa-solid fa-bolt"></i>{element['name'].toUpperCase()}</p>
                                    <div className="wat-lst-bod-head-menu">
                                        <button className="" onClick={() => handleOptionsClick(element.id)}>
                                            <i class="fa-solid fa-ellipsis"></i>
                                        </button>
                                        {/* <p><i class="fa-solid fa-sort-down"></i></p> */}
                                    </div>
                                </div>
                                {element['symbols'].map(ele => {
                                    return (
                                        <div className="wat-lst-bod-bod">
                                            <p>{ele.symbol}</p>
                                            {<WatchlistGraph symbol={ele.symbol} />}
                                        </div>
                                    )
                                })}
                                {/* Show options for selected watchlist */}
                                {selectedWatchlist === element.id && (
                                    <div className="wat-lst-mod-btn-cont">
                                        <div className="">

                                            <button className="wat-del-mod-btn">
                                                <OpenModalButton
                                                    buttonText={
                                                        <>
                                                            <i class="fa-solid fa-xmark"></i>
                                                            <span className="wat-edit-modal-btn-txt">Delete List</span>
                                                        </>
                                                    }
                                                    modalComponent={
                                                        <DeleteWatchListModal
                                                            id={element.id}
                                                            name={element.name}
                                                            len={element['symbols'.length]}

                                                        />
                                                    }


                                                />
                                            </button>
                                            <button className="wat-edit-modal-btn">
                                                <OpenModalButton
                                                    buttonText={<>
                                                        <i class="fa-solid fa-gear"></i>
                                                        {/* {'  edit'} */}
                                                        <span className="wat-edit-modal-btn-txt">Edit List</span>
                                                    </>}
                                                    modalComponent={
                                                        <EditListName
                                                            id={element.id}
                                                            name={element.name}
                                                            len={element['symbols'].length}
                                                        />
                                                    }
                                                />



                                            </button>



                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )

}
