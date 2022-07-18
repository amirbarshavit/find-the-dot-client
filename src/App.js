import { useEffect, useState } from "react";
import "./App.css";
import {
  startWaitingTime,
  startPlayTime,
} from "./services/timerManagerService";
import GameBoard from "./components/gameBoard/gameBoard";
import WaitingBoard from "./components/WaitingBoard/WaitingBoard";
import InputForm from "./components/InputForm/InputForm";
import { getRandomNumber } from "./utils";
import { updateScoreBoard } from "./services/request";

const SIDES = ["right", "left"];
const WAIT = "wait";
const PLAY = "play";
const INIT = "init";

const App = () => {
  const [gameMode, setGameMode] = useState(INIT);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const [didKeyPressed, setDidKeyPressed] = useState(true);
  const [side, setSide] = useState();
  const [userName, setUserName] = useState("");
  const [scoreCount, setScoreCount] = useState(0);

  useEffect(() => {
    window.addEventListener("keypress", keyboardClick);
    return () => {
      window.removeEventListener("keypress", keyboardClick);
    };
  });

  useEffect(() => {
    const runGame = async () => {
      if (gameMode === INIT) {
        return;
      }
      if (gameMode === WAIT) {
        if (!didKeyPressed) {
          onFailure("Too Late");
        }
        await startWaitingTime();
        setGameMode(PLAY);
      }
      if (gameMode === PLAY) {
        setDidKeyPressed(false);
        setSide(SIDES[getRandomNumber(0, 1)]);
        await startPlayTime();
        startNewPhase();
      }
    };
    runGame();
  }, [gameMode]);

  const keyboardClick = ({ key }) => {
    if (gameMode === INIT) {
      return;
    }
    setDidKeyPressed(true);
    if (gameMode === WAIT) {
      onFailure("Too Soon");
      return;
    }
    if ((key === "a" && side === "left") || (key === "i" && side === "right")) {
      onSuccess();
    } else {
      onFailure("Wrong Key");
    }
  };
  const startNewPhase = async () => {
    setGameMode(WAIT);
  };

  const onSuccess = () => {
    setSuccess(true);
    setMessage("Success");
    startNewPhase();
    setScoreCount((count) => count + 1);
  };

  const onFailure = (message) => {
    setSuccess(false);
    setMessage(message);
    startNewPhase();

    if (scoreCount) {
      updateScoreBoard({ name: userName, score: scoreCount });
    }

    setScoreCount(0);
  };

  const onFormSubmit = (name) => {
    setUserName(name);
    startNewPhase();
  };

  return (
    <div className="App">
      {gameMode === INIT ? <InputForm onSubmit={onFormSubmit} /> : null}
      {gameMode === WAIT ? (
        <WaitingBoard
          failedMessage={!success ? message : ""}
          successMessage={success ? message : ""}
        />
      ) : null}
      {gameMode === PLAY ? <GameBoard side={side} /> : null}
    </div>
  );
};

export default App;
