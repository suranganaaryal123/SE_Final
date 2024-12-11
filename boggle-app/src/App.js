import React, { useState, useEffect, useMemo } from 'react';
import { db, collection, addDoc, getDocs, query, orderBy, limit } from './firebase';
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
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [grid, setGrid] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [size, setSize] = useState(3);
  const [game, setGame] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);

  const myMap = useMemo(() => new Map(Object.entries(obj)), [obj]);

  useEffect(() => {
    let tmpAllSolutions = game.solutions;
    setAllSolutions(tmpAllSolutions);
  }, [grid, game]);

  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      const g = myMap.get(size.toString());
      setGame(g);
      setGrid(g.grid);
      setFoundSolutions([]);
    }
  }, [gameState, size, myMap]);

  // Fetch leaderboard when the component mounts or game ends
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const leaderboardData = querySnapshot.docs.map(doc => doc.data());
      setLeaderboard(leaderboardData);
    };

    fetchLeaderboard();
  }, [db, gameState]);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  // Calculate score based on the found solutions
  function calculateScore() {
    return foundSolutions.length;
  }

  // Save score to Firestore
  async function saveScore() {
    if (currentUser) {
      const score = calculateScore();
      try {
        await addDoc(collection(db, "leaderboard"), {
          username: currentUser.displayName,
          score,
          timestamp: new Date(),
        });
        console.log("Score saved successfully!");
      } catch (error) {
        console.log("Error saving score: ", error);
      }
    }
  }

  // Use effect to save score when game ends
  useEffect(() => {
    if (gameState === GAME_STATE.ENDED) {
      saveScore();
    }
  }, [gameState, currentUser, foundSolutions]);

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

      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, index) => (
            <li key={index}>{entry.username}: {entry.score}</li>
          ))
        ) : (
          <p>No leaderboard data available.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
