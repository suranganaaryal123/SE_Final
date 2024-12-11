import React, { useState, useEffect, useMemo } from 'react';
import Board from './components/Board.js';
import GuessInput from './components/GuessInput.js';
import FoundSolutions from './components/FoundSolutions.js';
import SummaryResults from './components/SummaryResults.js';
import ToggleGameState from './components/ToggleGameState.js';
import { LoginButton, LogoutButton } from './Authentication.js';
import logo from './logo.svg';
import './App.css';
import { GAME_STATE } from './components/GameState.js';


function App() {
  const obj = require('./Boggle_Solutions_Endpoint.json');
  const [currentUser, setCurrentUser] = useState(null);
  const [allSolutions, setAllSolutions] = useState([]);  // solutions from solver
  const [foundSolutions, setFoundSolutions] = useState([]);  // found by user
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE); // Just an enumerator for the three states see below
  const [grid, setGrid] = useState([]);   // the grid
  const [totalTime, setTotalTime] = useState(0);  // total time elapsed
  const [size, setSize] = useState(3);  // selected grid size
  const [game, setGame] = useState({}); // used to hold the MOCK REST ENDPOINT DATA 
  const myMap = useMemo(() => new Map(Object.entries(obj)), [obj]); // cache this value so that it doesn't have to be refreshed every time we visit the page.

  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions
  useEffect(() => {
    let tmpAllSolutions = game.solutions;
    setAllSolutions(tmpAllSolutions);
  }, [grid, game]);

  // This will run when gameState changes.
  // When a new game is started, generate a new random grid and reset solutions
  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      const g = myMap.get(size.toString());  // THIS WILL BE REPLACED WITH REST ENDPOINT in Assignment #5
      setGame(g);
      setGrid(g.grid);
      setFoundSolutions([]);
    }
  }, [gameState, size, myMap]);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  return (
    <div className="App">
      <img src={logo} width="25%" height="25%" className="logo" alt="Bison Boggle Logo" />

      {currentUser ? (
        <>
          <LogoutButton setCurrentUser={setCurrentUser} />

          <ToggleGameState gameState={gameState}
                           setGameState={(state) => setGameState(state)} 
                           setSize={(state) => setSize(state)}
                           setTotalTime={(state) => setTotalTime(state)} />

          {gameState === GAME_STATE.IN_PROGRESS &&
            <div>
              <Board board={grid} />
              <GuessInput allSolutions={allSolutions}
                          foundSolutions={foundSolutions}
                          correctAnswerCallback={(answer) => correctAnswerFound(answer)} />
              <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
            </div>
          }

          {gameState === GAME_STATE.ENDED &&
            <div>
              <Board board={grid} />
              <SummaryResults words={foundSolutions} totalTime={totalTime} />
              
              {/* Display missed words */}
              <FoundSolutions 
                headerText="Missed Words [wordsize > 3]:"
                words={allSolutions.filter(word => word.length > 3 && !foundSolutions.includes(word))}
              />
            </div>
          }
        </>
      ) : (
        <LoginButton setCurrentUser={(user) => setCurrentUser(user)} />
      )}
    </div>
  );
}

export default App;
