import test from "node:test";
import assert from "node:assert/strict";

import {
  EMPTY_BOARD,
  applyMove,
  checkWinner,
  isDraw,
  otherPlayer,
  type Board,
} from "../../src/lib/games/ticTacToe.ts";

test("checkWinner detects all 8 winning lines", () => {
  const lines: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    const board: Board = EMPTY_BOARD.slice();
    board[a] = "X";
    board[b] = "X";
    board[c] = "X";
    const result = checkWinner(board);
    assert.equal(result?.winner, "X");
    assert.deepEqual([...(result?.line ?? [])].sort(), [a, b, c].sort());
  }
});

test("checkWinner returns null with no three in a row", () => {
  const board: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
  assert.equal(checkWinner(board), null);
});

test("isDraw is true only when the board is full and nobody won", () => {
  const full: Board = ["X", "O", "X", "X", "O", "O", "O", "X", "X"];
  assert.equal(isDraw(full), true);

  const wonAndFull: Board = ["X", "X", "X", "O", "O", "X", "X", "O", "O"];
  assert.equal(isDraw(wonAndFull), false);

  assert.equal(isDraw(EMPTY_BOARD), false);
});

test("applyMove places a mark on an empty cell without mutating the input board", () => {
  const board = EMPTY_BOARD.slice();
  const next = applyMove(board, 4, "X");
  assert.equal(next[4], "X");
  assert.equal(board[4], null);
});

test("applyMove rejects an occupied or out-of-range cell", () => {
  const board = applyMove(EMPTY_BOARD.slice(), 0, "X");
  assert.throws(() => applyMove(board, 0, "O"));
  assert.throws(() => applyMove(board, 9, "O"));
  assert.throws(() => applyMove(board, -1, "O"));
});

test("otherPlayer alternates between X and O", () => {
  assert.equal(otherPlayer("X"), "O");
  assert.equal(otherPlayer("O"), "X");
});
