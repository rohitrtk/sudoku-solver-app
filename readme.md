# Challenge Details

Your client really loves Sudoku, and likes to create his own puzzles. He would like a way to verify the solution.

## Frontend

Implement a UI that allows the user to create their own sudoku puzzle. There should be two buttons on the UI. One to reset the puzzle, and the other to submit an API request to the server. The request should contain the numbers of the sudoku puzzle in a json as follows:
```
  {
    data: [
      [3, 0, 5, 4, 0, 2, 0, 6, 0],
      [4, 9, 0, 7, 6, 0, 1, 0, 8],
      [6, 0, 0, 1, 0, 3, 2, 4, 5],
      [0, 0, 3, 9, 0, 0, 5, 8, 0],
      [9, 6, 0, 0, 5, 8, 7, 0, 3],
      [0, 8, 1, 3, 0, 4, 0, 9, 2],
      [0, 5, 0, 6, 0, 1, 4, 0 ,0],
      [2, 0, 0, 5, 4, 9, 0, 7, 0],
      [1, 4, 9, 0, 0, 7, 3, 0, 6]
    ]
  }
```
If an array index contains a zero, it represents an empty space in the puzzle.

After a successful request, the solved array should be displayed.

## Backend

Implement a REST client to handle the route <b>/api/solve</b>. The route takes a 9 by 9 array as parameter. The array represents the puzzle to be solved. The request should return the solved puzzle in a 9 by 9 array, for the frontend to display.

### Optional Challenge

Implement a file upload system so users can upload a space delimited array of numbers, say in a text file, to make entering numbers into the puzzle easier.