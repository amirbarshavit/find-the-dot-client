import "./gameBoard.css";
import Circle from "../Circle/Circle";
const GameBoard = ({ side }) => {
  return (
    <div className="board">
      <div className="left side">{side === "left" ? <Circle /> : null}</div>
      <div className="right side">{side === "right" ? <Circle /> : null}</div>
    </div>
  );
};

export default GameBoard;
