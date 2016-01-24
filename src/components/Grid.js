import React, { Component, PropTypes } from 'react';
import ReactPIXI from 'react-pixi'

import Cell from './Cell'
const DisplayObjectContainer = ReactPIXI.DisplayObjectContainer



export default class Grid extends Component {
  getCells() {
    const lastCoin = this.props.lastCoin
    let cells = [], blur
    this.props.grid.forEach(function (col, colI) {
      col.forEach(function (row, rowI) {
        let cell = (
          <Cell
            key={`${colI}-${rowI}`}
            x_={colI} y_={5-rowI}
            content={row}
            onMouseOver={this.props.onMouseOverCell}
            onMouseClick={this.props.onMouseClickCell}
            interactive={(lastCoin)? false : true}
            highlight = {(lastCoin && lastCoin[0] == colI && lastCoin[1] == rowI)}
          />
        )
        cells.push(cell)
      }.bind(this))
    }.bind(this))
    return cells
  }

  render() {
    const cells = this.getCells()
    return (
      <DisplayObjectContainer>
        {cells}
      </DisplayObjectContainer>
    );
  }
}

/*
props:
  grid: 2d array representation of the grid state
  lastCoin: position of the winning move
  onMouseOverCell: mouse over listener, passes which column was hovered
  onMouseOverCell: mouse click listener, passes which column was clicked
*/
Grid.propTypes = {
  lastCoin: PropTypes.array,
  grid: PropTypes.array.isRequired,
  onMouseOverCell: PropTypes.func.isRequired,
  onMouseClickCell: PropTypes.func.isRequired
}
