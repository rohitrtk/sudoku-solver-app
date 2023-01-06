import React, { KeyboardEvent } from "react";

const styles = {
  container: {
    display: "inline-grid",
    gridTemplateColumns: "repeat(3, 1fr)"
  },
  input: {
    width: "50px",
    height: "50px",
    textAlign: "center" as const,
    fontSize: "xx-large"
  }
};

const subgridColour = {
  white: "rgb(255, 255, 255)",
  blue: "rgb(206, 221, 242)"
};

interface GridProps {
  boxesRef: React.MutableRefObject<HTMLInputElement[]>;
}

const Grid = ({ boxesRef }: GridProps) => {
  return (
    <div style={styles.container}>
      {[...Array(9).keys()].map((subgridIndex) => {
        const backgroundColour =
          subgridIndex % 2 === 0 ? subgridColour.white : subgridColour.blue;

        return (
          <Subgrid
            key={subgridIndex}
            boxesRef={boxesRef}
            subgridIndex={subgridIndex}
            backgroundColour={backgroundColour}
          />
        );
      })}
    </div>
  );
};

export default Grid;

interface SubgridProps extends GridProps {
  subgridIndex: number;
  backgroundColour: string;
}

export const Subgrid = ({
  boxesRef,
  subgridIndex,
  backgroundColour
}: SubgridProps) => {
  /**
   * Handles when a key is pressed on an input element
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Backspace" && !e.key.match(/^[0-9]{1}$/g)) {
      e.preventDefault();
    }
  };

  return (
    <div style={styles.container}>
      {[...Array(9).keys()].map((i) => {
        const arrayIndex = calculateIndex(subgridIndex, i);

        return (
          <input
            style={{
              ...styles.input,
              backgroundColor: backgroundColour
            }}
            key={arrayIndex}
            ref={(el) => {
              boxesRef.current[arrayIndex] = el!;
            }}
            type="number"
            onKeyDown={handleKeyPress}
          />
        );
      })}
    </div>
  );
};

/**
 * Helper function that calculates the index given the subgrid index and grid index.
 */
const calculateIndex = (subgridIndex: number, gridIndex: number): number => {
  const gridX = gridIndex % 3;
  const gridY = Math.floor(gridIndex / 3);
  const subgridY = Math.floor(subgridIndex / 3);

  return 9 * gridY + gridX + 3 * subgridIndex + 18 * subgridY;
};
