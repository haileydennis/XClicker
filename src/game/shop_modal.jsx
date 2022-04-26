import { useMultipliers } from '../utils/useMultipliers';

export const ShopModal = ({closeModal, user}) => {
  const [multipliers, updateMultiplier] = useMultipliers();


  return (
    <>
      <div onClick={closeModal} className="overlay"/>
      <div className="modal-container">
        <div className="modal">
          <h1> Upgrade Your Clix! </h1>
          <div className='test'>
            {multipliers.map((multiplier) => (
              <div key={multiplier.id}>
                <div className="inline-flex">
                  {multiplier.title}
                  <div>
                    {multiplier.numberOwned}
                  </div>
                </div>
                <button onClick={() => updateMultiplier(multiplier, 1, user.uid)}>+</button>
                <button onClick={() => updateMultiplier(multiplier, -1, user.uid)}>-</button>
              </div>
            ))}
            </div>
          <div className="close-btn">
            <button onClick={closeModal}>Close Shop</button>
          </div>
        </div>
      </div>
    </>
  )
}
