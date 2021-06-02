import logo from './logo.svg';
import './App.css';
import Configure from './views/config';
import Game from './views/game';
import History from './views/history';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <nav className="bg_nav flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">BlattleShip-APP</span>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/configuracion" className="nav_item block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Configuraciones
            </Link>
            <Link to="/tablero" className="nav_item block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              Jugar
            </Link>
            <Link to="/historico" className="nav_item block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
              Historial
            </Link>
          </div>
        </div>
      </nav>

      <div>
        <hr />
        <Switch>
          <Route exact path="/configuracion">
            <Configure/>
          </Route>
          <Route path="/tablero">
            <Game/>
          </Route>
          <Route path="/historico">
            <History/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
