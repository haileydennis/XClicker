import { useMultipliers } from '../../utils/useMultipliers';
import { useMoney } from '../../utils/useMoney';
import { useEffect, useState } from 'react';

export const ShopModal = ({openModal, closeModal, user}) => {
  const [multipliers, updateMultiplier] = useMultipliers();
  const [money, updateMoney] = useMoney();
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const [userMoney, setUserMoney] = useState(null);
  const [userMultiplier, setUserMultiplier] = useState(1);

  useEffect (() => {
    let newCart = [];
    multipliers.forEach((multiplier) => {
      newCart.push(
        {
          multiplier: multiplier,
          numberInCart: 0,
        }
      );
    });
    setCart(newCart);

    if (user) {
      let currUserMultiplier = 1;
      multipliers.forEach(m => {
        currUserMultiplier += m.multiplier * m.numberOwned;
      });
      setUserMultiplier(currUserMultiplier);
    }

  }, [multipliers]);

  useEffect (() => {
    if (user) {
      setUserMoney(money[0]);
    }
  }, [money]);

  const compare = (a, b) => {
    if (a.multiplier < b.multiplier) {
      return -1;
    }
    if (a.multiplier > b.multiplier) {
      return 1;
    }
    return 0;
  }

  const handleBuy = (multiplier) => {
    const item = cart.find(m => m.multiplier === multiplier);

    if ((item.numberInCart + multiplier.numberOwned) > multiplier.max) {
      setError(`Max item number exceeded. You may only buy ${multiplier.max - multiplier.numberOwned} of these.`);
      return;
    }
    if (item.numberInCart < 0) {
      setError(`You can't buy a negative number of items.`);
      return;
    }
    if (item.numberInCart * multiplier.cost > userMoney.amount) {
      setError(`Insufficient funds. You can afford ${Math.floor(userMoney.amount / multiplier.cost)} of these.`);
      return;
    }
    else {
      try {
        updateMultiplier(multiplier, item.numberInCart, user.uid);
        updateMoney(userMoney, -(item.numberInCart * multiplier.cost), user.uid);
        document.getElementById(multiplier.id).value = 0;
        setError('');
        return;
      }
      catch (e) {
        setError(e.message);
        return;
      }
    }
  }

  const handleSell = (multiplier) => {
    const item = cart.find(m => m.multiplier === multiplier);
    if (item.numberInCart < 0) {
      setError(`You can't sell a negative number of items.`);
      return;
    }
    if (item.numberInCart > multiplier.numberOwned) {
      setError(`You can't sell more items than you own.`);
      return;
    }
    else {
      try {
        updateMultiplier(multiplier, -item.numberInCart, user.uid);
        updateMoney(userMoney, (item.numberInCart * multiplier.cost), user.uid);
        document.getElementById(multiplier.id).value = 0;
        setError('');
        return;
      }
      catch (e) {
        setError(e.message);
        return;
      }
    }
  }

  const updateCart = (multiplier, value) => {
    let newCart = [...cart];
    const item = newCart.find(m => m.multiplier === multiplier);
    item.numberInCart = parseInt(value, 10);
    setCart([...newCart]);
  }

  const formatNumber = (amount) => {
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

  return (
    <>
      <div onClick={closeModal} className="overlay">
        <div className="modal-container">
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <h1> Upgrade Your Clicks! </h1>
            {userMoney &&
            <h3> Your Money: ${formatNumber(userMoney.amount)} |&nbsp;Your Power: {formatNumber(userMultiplier)}</h3>}
            <div>
              {multipliers.sort(compare).map((multiplier) => (
                <div key={multiplier.id} className="multiplier-container">
                  <div>
                    <span className='multiplier-title'>{multiplier.title}</span>
                    <div>
                      <span>Owned: {multiplier.numberOwned} |&nbsp;Power: +{formatNumber(multiplier.multiplier)} |&nbsp;Cost: {formatNumber(multiplier.cost)} |&nbsp;Max: {multiplier.max}</span>
                    </div>
                  </div>
                  <br></br>
                  <div className="buy-sell-container">
                  {multiplier.numberOwned !== multiplier.max || multiplier.numberOwned > multiplier.max ?
                  <><input className="shop-inputs" type="number" id={multiplier.id} min={0} onChange={(e) => updateCart(multiplier, e.target.value)} placeholder="Amount" /><button onClick={() => handleBuy(multiplier)}>Buy</button><button onClick={() => handleSell(multiplier)}>Sell</button></>
                  : 
                  <span>Maxed Out!</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="error-msg"> {error} </div>
            <div className="close-btn">
              <button onClick={closeModal}>Close Shop</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
