import { useMultipliers } from '../../utils/useMultipliers';
import { useMoney } from '../../utils/useMoney';
import { useEffect, useState } from 'react';

export const ShopModal = ({closeModal, user}) => {
  const [multipliers, updateMultiplier, initMultipliers] = useMultipliers();
  const [money, updateMoney, initMoney] = useMoney();
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const [userMoney, setUserMoney] = useState(null);

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
    if (item.numberInCart < 0) {
      setError(`You can't buy a negative number of items.`);
      return;
    }
    if (item.numberInCart * multiplier.cost > userMoney.amount) {
      setError(`You don't have enough money to buy that many items.`);
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
    console.log(item);
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


  return (
    <>
      <div onClick={closeModal} className="overlay"/>
      <div className="modal-container">
        <div className="modal">
          <h1> Upgrade Your Clicks! </h1>
          <div className='test'>
            {multipliers.sort(compare).map((multiplier) => (
              <div key={multiplier.id} className="multiplier-container">
                <div>
                  <span className='multiplier-title'>{multiplier.title}</span>
                  <div>
                    <span>Owned: {multiplier.numberOwned} |&nbsp;Power: x{multiplier.multiplier} |&nbsp;Cost: {multiplier.cost}</span>
                  </div>
                </div>
                <br></br>
                <div className="buy-sell-container">
                <input className="shop-inputs" type="number" id={multiplier.id} min={0} onChange={(e) => updateCart(multiplier, e.target.value)} placeholder="Amount" />
                    <button onClick={() => handleBuy(multiplier)}>Buy</button>
                    <button onClick={() => handleSell(multiplier)}>Sell</button>
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
    </>
  )
}
