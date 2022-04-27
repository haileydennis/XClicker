import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ShopModal } from "./game/shop_modal";

export const MenuBar = () => {
const [user, setUser] = useState(null);
const [auth, setAuth] = useState(getAuth());
const [isOpen, setIsOpen] = useState(false);
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

const handleOpen = () => {
  setIsOpen(!isOpen);
}

return (
  <div className="menu">
    <div className="menu-item">
      <p>XClicker</p>
    </div>
     {user && 
     <div onClick={handleOpen} className="menu-item">
      <p>Open Shop</p>
    </div>}
    {isOpen && user &&
      <ShopModal closeModal={handleOpen} user={user}></ShopModal>
    }
    {user &&
    <div onClick={handleLogout} className="menu-item" id="bottom-menu-item">
      <p>Logout</p>
    </div>}
  </div>
  );
}