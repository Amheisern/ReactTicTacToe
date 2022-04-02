import React from 'react'

//react flow add on
type CellProps = {
  cell: string
  rowIndex: number
  columnIndex: number
  recordMove: (row: number, column: number) => void
}
export function Cell(props: CellProps) {
  // This code allows for the deletion of .props repetition
  const { cell, rowIndex, columnIndex, recordMove } = props
  function handleClickCell() {
    // Send the event UPwards by calling the `recordMove` function we were given
    recordMove(rowIndex, columnIndex)
  }
  return (
    <li className={cell === ' ' ? '' : 'taken'} onClick={handleClickCell}>
      {cell}
    </li>
  )
}
