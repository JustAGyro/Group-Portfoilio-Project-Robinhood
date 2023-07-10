import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Graph from '../Graph';
import { addStock, getStock } from '../../store/stocks';
import AddToListModal from '../ModalsWatchlist/AddToListModal';
import './stockapi.css';

export default function StockApi() {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState('');
  const [update, setUpdate] = useState('');
  const [addToList, setAddToList] = useState(false);
  const [addListModal, setAddListModal] = useState(false);
  let fav = useSelector((state) => state.stocks[update]) || [];

  const [initialData, setInitialData] = useState([
    // { time: '2018-12-22', value: 32.51 },
    // { time: '2018-12-23', value: 31.11 },
    // { time: '2018-12-24', value: 27.02 },
    // { time: '2018-12-25', value: 27.32 },
    // { time: '2018-12-26', value: 25.17 },
    // { time: '2018-12-27', value: 28.89 },
    // { time: '2018-12-28', value: 25.46 },
    // { time: '2018-12-29', value: 23.92 },
    // { time: '2018-12-30', value: 22.68 },
    // { time: '2018-12-31', value: 22.67 },
  ]);

  const getIt = async () => {
    let it = await dispatch(getStock(symbol));

<<<<<<< HEAD
        return it
    }
    useEffect(() => {
        if (fav && fav.length > 0) setInitialData(fav)
        console.log("fav", fav)
    }, [fav])
=======
    return it;
  };
  useEffect(() => {
    if (fav && fav.length > 0) setInitialData(fav);
  }, [fav]);
>>>>>>> dev

  const onSubmit = async (e) => {
    e.preventDefault();
    let them = await getIt();
    console.log('them', them);
    setUpdate(symbol);
    setAddToList(true);
    // dispatch(addStock(them))
    // setInitialData(fav)
    // setInitialData(them.historical)
    // console.log(initialData)
  };

  return (
    <div className="stockapi-container">
      <div>
        <form method="GET" onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              name="symbol"
              onChange={(e) => setSymbol(e.target.value)}
              value={symbol}
            />
          </div>
          <div>
            <button type="submit"> submit </button>
          </div>
        </form>
      </div>
      <h2>{update}</h2>
      {addToList && (
        <button
          onClick={() => {
            setAddListModal(true);
          }}
        >
          Add to List
        </button>
      )}
      <Graph data={initialData} />
      {addListModal && (
        <div className="add-lst-modal-container">
          <AddToListModal closeModal={setAddListModal} symbol={update} />
        </div>
      )}

      {/* {fav?.map(ele => {
                let thing = Object.values(ele)
                let ping = `|${thing[0]} at ${thing[1]}|`
                return ping
            })} */}
    </div>
  );
}
