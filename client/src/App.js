import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import GameContainer from "./containers/GameContainer";
import HomeContainer from "./containers/HomeContainer";
import LevelMakerContainer from "./containers/LevelMakerContainer";

function App() {

  return (
    <Router>
      <nav>
        <a href="/">Home </a>
        <a href="/game"> Game </a>
        <a href="/levelmaker"> Level Creator </a>
      </nav>
        
      <Routes>
        <Route path="/" element={<HomeContainer/>}/>
        <Route path="/game" element={<GameContainer/>}/>
        <Route path="/levelmaker" element={<LevelMakerContainer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
