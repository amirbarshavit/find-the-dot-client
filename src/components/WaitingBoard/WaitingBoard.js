import "./WaitingBoard.css";
const WaitingBoard = ({ failedMessage, successMessage }) => {
  return (
    <div className="waiting-board">
      <h3>Waiting...</h3>
      {failedMessage ? (
        <div className="message failed">{failedMessage}</div>
      ) : null}
      {successMessage ? (
        <div className="message success">{successMessage}</div>
      ) : null}
    </div>
  );
};

export default WaitingBoard;
