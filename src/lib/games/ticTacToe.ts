export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export const EMPTY_BOARD: Board = Array(9).fill(null);

export const WIN_LINES: readonly (readonly [number, number, number])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export interface WinResult {
  winner: Player;
  line: readonly [number, number, number];
}

export function checkWinner(board: Board): WinResult | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    const value = board[a];
    if (value && value === board[b] && value === board[c]) {
      return { winner: value, line };
    }
  }
  return null;
}

export function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && checkWinner(board) === null;
}

export function otherPlayer(player: Player): Player {
  return player === "X" ? "O" : "X";
}

export function applyMove(board: Board, index: number, player: Player): Board {
  if (index < 0 || index >= board.length || board[index] !== null) {
    throw new Error(`Invalid move: cell ${index} is not empty`);
  }
  const next = board.slice();
  next[index] = player;
  return next;
}
