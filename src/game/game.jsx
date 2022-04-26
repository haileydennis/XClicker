/* eslint-disable eqeqeq */
import { useState, useEffect } from 'react';
import { useMoney } from '../utils/useMoney';
import { useMultipliers } from '../utils/useMultipliers';
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
    console.log(multipliers);
    if (user && multipliers.length !== 0) {
      console.log(multipliers);
      let currUserMultiplier = 0;
      multipliers.forEach(m => {
        currUserMultiplier += m.multiplier * m.numberOwned;
      });
  
      if (currUserMultiplier == 0) {
        currUserMultiplier = 1;
      }
  
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
    if (amount < 1000000000000000000n) {
      return (amount / 1000000000000000).toFixed(2) + 'Q';
    }
    if (amount < 1000000000000000000000n) {
      return (amount / 1000000000000000000n).toFixed(2) + 'QQ';
    }
    return (amount / 1000000000000000000000n).toFixed(2) + 'QQQ';
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
            <button className="main-btn" onClick={() => { updateMoney(userMoney, userMultiplier, user.uid); } }>X</button>
          </div>
        </div></> : null}
    </div>
  );


}