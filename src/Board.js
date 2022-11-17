import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 2, ncols = 3, chanceLightStartsOn = .5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      initialBoard.push(new Array(ncols).fill(true));
      initialBoard[i] = initialBoard[i].map(c => {
        return Math.random() > chanceLightStartsOn
      });
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    console.log("Board>>>>>>>>>>", board);
    return board.every(row => row.every(col => col === false));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      console.log("coord ==========", coord);
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const oldBoardCopy = oldBoard.slice(0, nrows);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, oldBoardCopy);
      flipCell(y + 1, x, oldBoardCopy);
      flipCell(y - 1, x, oldBoardCopy);
      flipCell(y, x + 1, oldBoardCopy);
      flipCell(y, x - 1, oldBoardCopy);

      // TODO: return the copy
      return oldBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO:
  if (hasWon()) {
    return (
      <p>"You Win!"</p>
    );
  }
  // make table board

  // TODO:

  return (
    <table>
      <tbody>
        {board.map((row, y) =>
          <tr key={y}>
            {row.map((cell, x) =>
              <Cell
                key={x}
                isLit={cell}
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
              />
            )}
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Board;
