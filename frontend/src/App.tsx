import React, { useRef, useState, useEffect, useCallback } from "react";
import Buttons from "./Components/Buttons";
import Grid from "./Components/Grid";

const App = () => {
  // References to the grids 81 boxes
  const boxesRef = useRef<HTMLInputElement[]>([]);

  // Values of the grids 81 boxes
  const [gridValues, setGridValues] = useState<number[][]>(
    [...Array(9)].map(() => [...Array(9)])
  );

  /**
   * Creates an APi request to solve the puzzle with the given inputs
   */
  const solvePuzzle = useCallback(async () => {
    // TODO: Callback hell
    for (let i = 0; i < boxesRef.current.length; i++) {
      const x = i % 9;
      const y = Math.floor(i / 9);

      const val = boxesRef.current[i].value;
      gridValues![y][x] = val === "" ? 0 : parseInt(val);
    }

    try {
      const res = await fetch("http://127.0.0.1:8080/api/solve", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: gridValues
        })
      });
      const data = await res.json();

      console.log(data);

      let t = [...gridValues!];
      for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
          t![y][x] = data[y][x];
        }
      }

      setGridValues!([...t]);
    } catch (e) {
      console.error(e);
    }
  }, [gridValues]);

  /**
   * Resets the grid
   */
  const resetPuzzle = () => {
    boxesRef.current.forEach((el: HTMLInputElement) => {
      el.value = "";
    });
  };

  /**
   * When a grid value is changed, update the value of the reference
   */
  useEffect(() => {
    for (let i = 0; i < boxesRef.current.length; i++) {
      const x = i % 9;
      const y = Math.floor(i / 9);
      //console.log(gridValues[y][x]);
      if (gridValues[y][x]) {
        if (!boxesRef.current[i].value) {
          boxesRef.current[i].style.color = "green";
        }
        boxesRef.current[i].value = gridValues[y][x].toString();
      }
    }
  }, [gridValues]);

  return (
    <div className="App">
      <h1>Sudoku Solver</h1>
      <Grid boxesRef={boxesRef} />
      <Buttons solvePuzzle={solvePuzzle} resetPuzzle={resetPuzzle} />
    </div>
  );
};

export default App;
