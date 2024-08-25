import React, { useState, useEffect } from "react";

import { startGame, guessApi } from "../shared/api/weather-api";
import "./App.scss";

const App: React.FC = () => {
  const [guess, setGuess] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [attempt, setAttempt] = useState<number>(0);

  useEffect(() => {
    const startGame = async () => {
      try {
        await startGame();
        setGuess("");
        setResult("");
        setGameOver(false);
      } catch (error) {
        console.error("Error starting game:", error);
      }
    };

    startGame();
  }, [setGuess, setResult, setGameOver]);

  const handleGuess = async () => {
    try {
      const parsedGuess = parseInt(guess, 10);
      if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
        setResult("Please enter a number between 1 and 100.");
        return;
      }

      const { message, status } = await guessApi(parsedGuess);
      setAttempt((prevState) => prevState+1);
      setResult(message);
      if (status === "win") {
        setGameOver(true);
      }
    } catch (error) {
      console.error("Error making guess:", error);
    }
  };

  const handleRestart = async () => {
    try {
      await startGame();
      setAttempt(0);
      setGuess("");
      setResult("");
      setGameOver(false);
    } catch (error) {
      console.error("Error restarting game:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");

    setGuess(value);
  };

  return (
    <>
      <header></header>
      <main>
        <div className="container">
          <h1 className="title">Guess the Number Game</h1>
          <input
            name="number"
            value={guess}
            onChange={handleInputChange}
            className="input"
            disabled={gameOver}
            placeholder="Enter 1-100"
          />
          <button onClick={handleGuess} className="button" disabled={gameOver}>
            Guess
          </button>
          {result ? <div>(Attempt: {attempt})</div>: null}
          <div className="result">{result}</div>
          {gameOver && (
            <button onClick={handleRestart} className="restartButton">
              Start Again
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default App;
