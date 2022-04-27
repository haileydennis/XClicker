import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Game } from "../game/game";
import { Login } from "../userAuth/login";
import { useEffect, useState } from "react";

export const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      
    });
  }, []);

  return (
    <>
      {
        user ?
          <Game user={user}/>
          :
          <Login />
      }
    </>
  );
}