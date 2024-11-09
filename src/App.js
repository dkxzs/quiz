import "./App.css";
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <header className="App-header">
        <Header />
        <div>
          test Link
          <div>
            <button>
              <Link to="/user">go to user</Link>
            </button>
            <button>
              <Link to="/admin">go to admin</Link>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
