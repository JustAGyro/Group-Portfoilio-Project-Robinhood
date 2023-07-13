// import React, { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import WatchListModal from "../ModalsWatchlist/ShowListModal";
// import DeleteWatchListModal from "../ModalsWatchlist/DeleteListModal";
// import { getAllWatchlistsThunk, getOneWatchlistThunk, createWatchlistThunk, deleteWatchlistThunk, createSymbollistThunk, deleteSymbollistThunk } from "../../store/watchlist";
// import WatchlistGraph from "../WatchlistGraphs";
// import './watchlist.css'

// export default function WatchLists() {
//     const dispatch = useDispatch()
//     const [openModal, setOpenModal] = useState(false)
//     const [deleteModal, setDeleteModal] = useState(false)
//     let watchlists = useSelector(state => state?.watchlists)
//     watchlists = Object.values(watchlists)
//     console.log(watchlists, '-----------watchlists state flag---------------')

//     useEffect(() => {
//         dispatch(getAllWatchlistsThunk())
//     }, [dispatch])
//     return (

//         <>
//             <div className="wat-lst-mn-ctn">
//                 <div className="wat-lst-header">
//                     <p>
//                         Lists
//                     </p>
//                     <div>
//                         <button className="cre-lst-openModalBtn" onClick={() => { setOpenModal(true) }}><i class="fa-solid fa-plus"></i></button>
//                         {openModal && <WatchListModal closeModal={setOpenModal} />}
//                     </div>

//                 </div>
//                 <div>
//                     {watchlists.map(ele => {
//                         return (
//                             <div className="wat-lst-pri-cont">
//                                 <div className="wat-lst-bod-head">
//                                     <p>{ele['name'].toUpperCase()}</p>
//                                     <div className="wat-lst-bod-head-menu">
//                                         <button className=""><i class="fa-solid fa-ellipsis"></i></button>
//                                         <p><i class="fa-solid fa-sort-down"></i></p>
//                                     </div>
//                                 </div>
//                                 {ele['symbols'].map(ele => {
//                                     return (
//                                         <div className="wat-lst-bod-bod">
//                                             <p>{ele.symbol}</p>
//                                             {<WatchlistGraph symbol={ele.symbol} />}
//                                         </div>
//                                     )
//                                 })}
//                                 <div className="yellllo"> options</div>
//                                 <button onClick={() => { setDeleteModal(true) }}>Delete</button>
//                                 {deleteModal && <DeleteWatchListModal closeModal={setDeleteModal} id={ele.id} />}
//                             </div>
//                         )
//                     })}

//                 </div>
//                 <div>
//                     {/* <button className="openModalBtn" onClick={() => { setOpenModal(true) }}>create list</button>
//                     {openModal && <WatchListModal closeModal={setOpenModal} />} */}
//                 </div>

//             </div>
//         </>
//     )
// }
// -----------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WatchListModal from '../ModalsWatchlist/ShowListModal';
import DeleteWatchListModal from '../ModalsWatchlist/DeleteListModal';
import EditListName from '../ModalsWatchlist/EditListModal';
import {
  getAllWatchlistsThunk,
  getOneWatchlistThunk,
  createWatchlistThunk,
  deleteWatchlistThunk,
  createSymbollistThunk,
  deleteSymbollistThunk,
} from '../../store/watchlist';
import WatchlistGraph from '../WatchlistGraphs';
import './watchlist.css';

export default function WatchLists() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editListModal, setEditListModal] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const history = useHistory();

  let watchlists = useSelector((state) => state?.watchlists);
  const user = useSelector((state) => state.session.user);
  watchlists = Object.values(watchlists);

  console.log(watchlists, '-----------watchlists state flag---------------');

  useEffect(() => {
    dispatch(getAllWatchlistsThunk());
  }, [dispatch]);

  const handleOptionsClick = (watchlistId) => {
    if (selectedWatchlist === watchlistId) {
      setSelectedWatchlist(null);
    } else {
      setSelectedWatchlist(watchlistId);
    }
  };
  // upon loggin out returns back to home
  if (!user) {
    history.push('/');
    return null;
  }

  return (
    <>
      <div className="wat-lst-mn-ctn">
        <div className="wat-lst-header">
          <p>Watch Lists</p>
          <div>
            <button
              className="cre-lst-openModalBtn"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <i class="fa-solid fa-plus"></i>
            </button>
            {openModal && <WatchListModal closeModal={setOpenModal} />}
          </div>
        </div>
        <div>
          {watchlists.map((element) => {
            return (
              <div className="wat-lst-pri-cont">
                <div className="wat-lst-bod-head">
                  <p>{element['name'].toUpperCase()}</p>
                  <div className="wat-lst-bod-head-menu">
                    <button
                      className=""
                      onClick={() => handleOptionsClick(element.id)}
                    >
                      <i class="fa-solid fa-ellipsis"></i>
                    </button>
                    <p>
                      <i class="fa-solid fa-sort-down"></i>
                    </p>
                  </div>
                </div>
                {element['symbols'].map((ele) => {
                  return (
                    <div className="wat-lst-bod-bod">
                      <p>{ele.symbol}</p>
                      {<WatchlistGraph symbol={ele.symbol} />}
                    </div>
                  );
                })}
                {/* Show options for selected watchlist */}
                {selectedWatchlist === element.id && (
                  <div className="wat-lst-mod-btn-cont">
                    <div className="">
                      <button
                        onClick={() => {
                          setDeleteModal(true);
                        }}
                        className="wat-lst-delete-mod-btn"
                      >
                        <i class="fa-solid fa-circle-xmark"></i>Delete list{' '}
                      </button>
                      <button
                        onClick={() => {
                          setEditListModal(true);
                        }}
                      >
                        Edit List
                      </button>
                      {deleteModal && (
                        <DeleteWatchListModal
                          closeModal={setDeleteModal}
                          id={element.id}
                          name={element.name}
                          len={element['symbols'].length}
                        />
                      )}
                      {editListModal && (
                        <EditListName
                          closeModal={setEditListModal}
                          id={element.id}
                          name={element.name}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
