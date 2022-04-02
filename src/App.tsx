import React, { useState } from 'react'
import { Cell } from './Cell'
type Square = 'X' | 'O' | ' '
type Row = [Square, Square, Square]
type Game = {
  board: [Row, Row, Row]
  id: null | number
  winner: null | string
}
export function App() {
  const [game, setGame] = useState<Game>({
    board: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
    id: null,
    winner: null,
  })
  async function recordMove(row: number, column: number) {
    if (
      // No game id
      game.id === null ||
      // A winner exists
      game.winner ||
      // The space isn't blank
      game.board[row][column] !== ' '
    ) {
      return
    }
    // Generate the URL we need
    const url = `https://sdg-tic-tac-toe-api.herokuapp.com/game/${game.id}`
    // Make an object to send as JSON
    const body = { row: row, column: column }
    // Make a POST request to make a move
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      // Get the response as JSON
      const newGameState = (await response.json()) as Game
      // Make that the new state!
      setGame(newGameState)
    }
  }
  async function handleNewGame() {
    // Make a POST request to ask for a new game
    const response = await fetch(
      'https://sdg-tic-tac-toe-api.herokuapp.com/game',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )
    if (response.ok) {
      // Get the response as JSON
      const newGameState = (await response.json()) as Game
      // Make that the new state!
      setGame(newGameState)
    }
  }
  const header = game.winner ? `${game.winner} is the winner` : 'Tic Tac Toe'
  return (
    <div>
      <h1>
        {header} - {game.id}
        <button onClick={handleNewGame}>New</button>
      </h1>
      <ul>
        {game.board.map((boardRow, rowIndex) => {
          return boardRow.map((cell, columnIndex) => {
            return (
              <Cell
                key={columnIndex}
                // cell={cell}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                cell={game.board[rowIndex][columnIndex]}
                recordMove={recordMove}
              />

              // <li
              //   key={columnIndex}
              //   className={cell === ' ' ? undefined : 'taken'}
              //   onClick={() => handleClickCell(rowIndex, columnIndex)}
              // >
              //   {cell}
              // </li>
            )
          })
        })}
      </ul>
    </div>
  )
}
