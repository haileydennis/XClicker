/* eslint-disable eqeqeq */
import { useState, useEffect, useRef } from 'react';
import { useMoney } from '../../utils/useMoney';
import { useMultipliers } from '../../utils/useMultipliers';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RandomEvents } from './randomEvents';
import toast from 'react-hot-toast';

export const Game = () => {
  const [userMoney, setUserMoney] = useState(null);
  const [loadingMoney, setLoadingMoney] = useState(true);
  const [user, setUser] = useState(null);
  const [money, updateMoney] = useMoney();
  const [multipliers] = useMultipliers();
  const [loadingMultipliers, setLoadingMultipliers] = useState(true);
  const [userMultiplier, setUserMultiplier] = useState(0);


  useEffect(() => {
    setUserMoney(money[0]);
    setLoadingMoney(false);
  }, [money]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user && multipliers.length !== 0) {
      let currUserMultiplier = 1;
      multipliers.forEach(m => {
        currUserMultiplier += m.multiplier * m.numberOwned;
      });
      setUserMultiplier(currUserMultiplier);
      setLoadingMultipliers(false);
    }
  }, [multipliers, user]);

  const formatMoney = (amount) => {
    if (amount < 1000000) {
      return amount;
    }
    if (amount < 1000000000) {
      return (amount / 1000000).toFixed(2) + 'M';
    }
    if (amount < 1000000000000) {
      return (amount / 1000000000).toFixed(2) + 'B';
    }
    if (amount < 1000000000000000) {
      return (amount / 1000000000000).toFixed(2) + 'T';
    }
    if (amount < 1000000000000000000) {
      return (amount / 1000000000000000).toFixed(2) + 'Q';
    }
    if (amount < 1000000000000000000000) {
      return (amount / 1000000000000000000).toFixed(2) + 'QQ';
    }
    else {
      return (amount / 1000000000000000000000).toFixed(2) + 'QQQ';
    }
  }


  if (loadingMoney || !user || loadingMultipliers) {
    return <div className="loading">
      <div>
        Loading...
      </div>
    </div>;
  }

  return (
    <div>
      {userMoney ? 
      <><div className='score-holder'>
          <div className='score-n-btn'>
            <h1 className="score">${formatMoney(userMoney.amount)} </h1>
            <button className="main-btn" onClick={() => updateMoney(userMoney, userMultiplier, user.uid)}>X</button>
          </div>
        </div>
        <RandomEvents userMultiplier={userMultiplier} user={user} formatMoney={formatMoney}></RandomEvents></>
         : null}
    </div>
  );


}