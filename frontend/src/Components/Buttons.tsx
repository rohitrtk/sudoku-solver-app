import React from "react";

const styles = {
  wrapper: {},
  button: {}
};

interface ButtonsProps {
  solvePuzzle: () => Promise<void>;
  resetPuzzle: () => void;
}

const Buttons = ({ solvePuzzle, resetPuzzle }: ButtonsProps) => {
  return (
    <div style={styles.wrapper}>
      <button type="submit" className="btn" onClick={solvePuzzle}>
        Submit
      </button>
      <button type="button" className="btn" onClick={resetPuzzle}>
        Reset
      </button>
    </div>
  );
};

export default Buttons;
