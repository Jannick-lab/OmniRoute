"use client";

import { useMemo, useState } from "react";
import {
  EMPTY_BOARD,
  applyMove,
  checkWinner,
  isDraw,
  otherPlayer,
  type Board,
  type Player,
} from "@/lib/games/ticTacToe";

export default function TicTacToePage() {
  const [board, setBoard] = useState<Board>(EMPTY_BOARD);
  const [current, setCurrent] = useState<Player>("X");

  const result = useMemo(() => checkWinner(board), [board]);
  const draw = useMemo(() => isDraw(board), [board]);
  const gameOver = result !== null || draw;

  function handleCellClick(index: number) {
    if (gameOver || board[index] !== null) return;
    setBoard(applyMove(board, index, current));
    setCurrent(otherPlayer(current));
  }

  function reset() {
    setBoard(EMPTY_BOARD);
    setCurrent("X");
  }

  const status = result
    ? `${result.winner} gewinnt! 🎉`
    : draw
      ? "Unentschieden!"
      : `${current} ist am Zug`;

  return (
    <main
      style={{
        maxWidth: 420,
        margin: "0 auto",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 24, margin: "0 0 8px" }}>Drei gewinnt</h1>
      <p style={{ fontSize: 16, margin: "0 0 20px", color: "#555" }}>{status}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 96px)",
          gridTemplateRows: "repeat(3, 96px)",
          gap: 6,
        }}
      >
        {board.map((cell, index) => {
          const isWinningCell = result?.line.includes(index) ?? false;
          return (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              disabled={gameOver || cell !== null}
              aria-label={`Feld ${index + 1}${cell ? `, belegt mit ${cell}` : ", frei"}`}
              style={{
                width: 96,
                height: 96,
                fontSize: 40,
                fontWeight: 700,
                borderRadius: 8,
                border: "2px solid #ccc",
                background: isWinningCell ? "#c6f6d5" : "#fff",
                color: cell === "X" ? "#2b6cb0" : "#c53030",
                cursor: gameOver || cell !== null ? "default" : "pointer",
              }}
            >
              {cell}
            </button>
          );
        })}
      </div>

      <button
        onClick={reset}
        style={{
          marginTop: 24,
          padding: "10px 20px",
          borderRadius: 10,
          border: "none",
          background: "#10a37f",
          color: "#fff",
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        Neues Spiel
      </button>
    </main>
  );
}
