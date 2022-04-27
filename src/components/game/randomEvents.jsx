import { useState, useEffect, useRef } from "react";

export const RandomEvents = ({userMoney, updateMoney, userMultiplier, user}) => {
  const [events, setEvents] = useState([]);
  const eventsRef =  useRef(events);



  const generateEvent = () => {
    const randomNum = Math.floor(Math.random() * 10);
    if (randomNum === 4) {
      const loseOrWin = Math.floor(Math.random() * 3);
      const amount = Math.floor(Math.random() * 1000) * userMultiplier;
      if (loseOrWin === 0) {
        const newEvent = {
          type: "lose",
          amount: amount,
        }
        eventsRef.current.push(newEvent);
        updateMoney(userMoney, -amount, user.uid);
      }
      else {
        updateMoney(userMoney, amount, user.uid);
        const newEvent = {
          type: "win",
          amount: amount,
          time: new Date().toLocaleString(),
        }
        eventsRef.current.push(newEvent);
      }
      setEvents([...eventsRef.current]);
    }
  }

  useEffect(() => {
    const interval = setInterval(generateEvent, 1000);
    return () => clearInterval(interval);
  }, []);

  const compare = (a, b) => {
    if (a.time > b.time) {
      return -1;
    }
    if (a.time < b.time) {
      return 1;
    }
    return 0;
  }



  return (
    <div className="events-container">
      <h1>Random Event Log</h1>
      <div className="events-list">
        <div className="event-div">
          {events.sort(compare).map((event, index) => {
            return (
              <div key={index}>
                <p>{event.type === 'win' ? 'You won' : 'You lost'} ${event.amount}</p>
              </div>
            )
          }
          )}
        </div>
      </div>
    </div>
  )
}