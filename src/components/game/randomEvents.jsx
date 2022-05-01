import { useState, useEffect, useRef } from "react";
import { useEvents } from "../../utils/useEvents";
import { useMoney } from "../../utils/useMoney";

export const RandomEvents = ({userMultiplier, user, formatMoney}) => {
  const [events, setEvents] = useState([]);
  const eventsRef =  useRef(events);
  const [getWinEvent, getLoseEvent] = useEvents();
  const [userMoney, setUserMoney] = useState(null);
  const [loadingMoney, setLoadingMoney] = useState(true);
  const [money, updateMoney] = useMoney();
  

  useEffect(() => {
    setUserMoney(money[0]);
    setLoadingMoney(false);
  }, [money]);

  const generateEvent = () => {
    const randomNum = Math.floor(Math.random() * 10);
    if (randomNum === 4) {
      const loseOrWin = Math.floor(Math.random() * 4);
      const amount = Math.floor(Math.random() * 1000) * userMultiplier;
      if (loseOrWin === 0) {
        const newEvent = {
          type: "lose",
          amount: amount,
          time: new Date(),
          message: getLoseEvent(),
        }
        eventsRef.current.push(newEvent);
        updateMoney(userMoney, -amount, user.uid);
      }
      else {
        const newEvent = {
          type: "win",
          amount: amount,
          time: new Date(),
          message: getWinEvent(),
        }
        eventsRef.current.push(newEvent);
        updateMoney(userMoney, amount, user.uid);
      }
      setEvents([...eventsRef.current.sort((a, b) => b.date - a.date).reverse()]);
    }
  }

  useEffect(() => {
    if (!loadingMoney) {    
      const interval = setInterval(generateEvent, 5000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="events-container">
      <h1>Random Event Log</h1>
      <div className="events-list">
        <div className="event-div">
          {events.map((event, index) => {
            return (
              <div key={index}>
                <p>[{event.time.toLocaleTimeString()}]: {event.message} ${formatMoney(event.amount)}.</p>
              </div>
            )
          }
          )}
        </div>
      </div>
    </div>
  )
}