import { useState } from "react";
import "./InputForm.css";

const InputForm = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const onClick = () => {
    onSubmit(value);
  };

  return (
    <div className="form-box">
      <input
        className="input-box"
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
      <button className="btn" disabled={!value} onClick={onClick}>
        Start play
      </button>
    </div>
  );
};

export default InputForm;
