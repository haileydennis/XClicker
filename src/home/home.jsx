/* eslint-disable eqeqeq */
import { useState, useEffect, useRef } from 'react';
import { doc, addDoc, collection, onSnapshot, setDoc, getFirestore } from 'firebase/firestore';
import { useMultipliers } from '../utils/useMultipliers';
import { useMoney } from '../utils/useMoney';

export const Home = () => {
  const [multipliers, updateMultiplier, initMultipliers] = useMultipliers();
  const [money, updateMoney, initMoney] = useMoney();
  const [userMoney, setUserMoney] = useState(null);
  const [userMultiplier, setUserMultiplier] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (!money.length == 0 && !multipliers.length == 0) {
      const findMoney = money.find(m => m.userId === 'me');
      setUserMoney(findMoney);

      const userMultipliers = multipliers.filter(m => m.userId === 'me');
      let currUserMultiplier = 0;
      userMultipliers.forEach(m => {
        currUserMultiplier += m.multiplier * m.numberOwned;
      });

      if (currUserMultiplier == 0) {
        currUserMultiplier = 1;
      }

      setUserMultiplier(currUserMultiplier);
      setLoading(false);
    }
  }, [money, multipliers, userMultiplier]);

  const formatMoney = (amount) => {
    if (amount.length < 7) {
      return amount;
    }
    if (amount.length >= 7 && amount.length < 9) {
      return amount / 1000000 + 'M';
    }
  }

  if (loading) {
    return <div className="loading">
      Loading...
      <button onClick={() => {initMultipliers(); initMoney()}}>START</button>
    </div>;
  }

  return (
    <div>
      {console.log(userMoney.amount.length)}
      <h1 className="score">${userMoney.amount} </h1>
      <div className="btn-test">
        <button onClick={() => {updateMoney(userMoney, userMultiplier)}}>+</button>
      </div>
      <div className='test'>
        {multipliers.map((multiplier) => (
          <div key={multiplier.id}>
            <div className="inline-flex">
              {multiplier.title}
              <div>
              {multiplier.numberOwned}
              </div>
              </div>
            <button onClick={() => updateMultiplier(multiplier, 1)}>+</button>
            <button onClick={() => updateMultiplier(multiplier, -1)}>-</button>
          </div>
        ))}
      </div>
    </div>
  );


}