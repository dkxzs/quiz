import "./App.css";
import Header from "./components/Header/Header";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <header className="App-header">
        <div className="header-container">
          <Header />
        </div>
        <div className="main-container">
          <div className="sidenav-container"></div>
          <div className="app-content">
            <Outlet />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
