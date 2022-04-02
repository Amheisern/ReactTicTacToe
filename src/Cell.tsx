import React from 'react'

//react flow add on
type CellProps = {
  cell: string
  rowIndex: number
  columnIndex: number
  recordMove: (_row: number, _column: number) => void
}
export function Cell({ cell, rowIndex, columnIndex, recordMove }: CellProps) {
  // This code allows for the deletion of .props repetition
  // const { cell, rowIndex, columnIndex, recordMove } = props
  // above code is no longer needed since it has been declared in line in the Cell function above
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
