import './App.css';
import { Outlet } from "react-router-dom";
import toast from 'react-hot-toast';
import { MenuBar } from './menu_bar';

function App() {
  return (
    <div>
      <div>
        <MenuBar />
      </div>
      <Outlet />
    </div>
  );
}

export default App;
