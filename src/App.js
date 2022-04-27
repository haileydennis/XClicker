import './App.css';
import { Outlet } from "react-router-dom";
import { MenuBar } from './components/menu_bar';

function App() {
  return (
    <div>
      <div>
        <MenuBar/>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
