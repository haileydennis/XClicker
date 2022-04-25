import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const MenuBar = () => {
const [user, setUser] = useState(null);
const [auth, setAuth] = useState(getAuth());
const nav = useNavigate();


useEffect(() => {
  setAuth(getAuth());
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
}, []);

const handleLogout = () => {
  auth.signOut();
  setUser(null);
  nav("/");
}

return (
  <div className="menu">
    <div className="menu-item">
      <p>XClicker</p>
    </div>
     {user && 
     <div className="menu-item">
      <p>Open Shop</p>
    </div>}
    {user &&
    <div className="menu-item" id="bottom-menu-item">
      <p onClick={handleLogout}>Logout</p>
    </div>}
  </div>
  );
}