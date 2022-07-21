
import './index.css';
import apiKey from './config';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Search from './Components/Search';
import Notfound from './Components/Notfound';


export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/search" element={<Search/>} />
          <Route path="/notfound" element={<Notfound/>} />
        </Routes>
      </div>
    </Router>
  );
}

