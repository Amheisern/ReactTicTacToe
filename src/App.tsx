import React, { useState } from 'react'
export function App() {
  const [game, setGame] = useState({
    board: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
    id: null,
    winner: null,
  })
  async function handleClickCell(row: number, column: number) {
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
      const newGameState = await response.json()
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
      const newGameState = await response.json()
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
              <li
                key={columnIndex}
                onClick={() => handleClickCell(rowIndex, columnIndex)}
              >
                {cell}
              </li>
            )
          })
        })}
      </ul>
    </div>
  )
}
// Code to do away with repeated code of <li>
// <ul>
// {game.board.map((boardRow, rowIndex) => {
// return boardRow.map((cell, columnIndex) => {
// return (
// <li
// key={columnIndex}
// onClick={() => handleClickCell(rowIndex, columnIndex)}
// >
// {cell}
// </li>
// )
// })
// })}
// </ul>
//  <ul>
//    <li onClick={() => handleClickCell(0, 0)}>{game.board[0][0]}</li>
//    <li onClick={() => handleClickCell(0, 1)}>{game.board[0][1]}</li>
//    <li onClick={() => handleClickCell(0, 2)}>{game.board[0][2]}</li>
//    <li onClick={() => handleClickCell(1, 0)}>{game.board[1][0]}</li>
//    <li onClick={() => handleClickCell(1, 1)}>{game.board[1][1]}</li>
//    <li onClick={() => handleClickCell(1, 2)}>{game.board[1][2]}</li>
//    <li onClick={() => handleClickCell(2, 0)}>{game.board[2][0]}</li>
//    <li onClick={() => handleClickCell(2, 1)}>{game.board[2][1]}</li>
//    <li onClick={() => handleClickCell(2, 2)}>{game.board[2][2]}</li>
//  </ul>
