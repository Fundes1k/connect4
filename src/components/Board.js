import React, { Component } from 'react';
import ReactPIXI from 'react-pixi'

import Grid from './Grid'
import PlayerInput from './PlayerInput'
const DisplayObjectContainer = ReactPIXI.DisplayObjectContainer

import { connect } from 'react-redux'
import {confirmTurn, restartGame} from '../actions/game'

class Board extends Component {
  constructor() {
    super();
    this.onMouseOverCell = this.onMouseOverCell.bind(this);
    this.onMouseClickCell = this.onMouseClickCell.bind(this);
    this.onRestart = this.onRestart.bind(this);
    this.state = { columnCandidate: null }
  }
  onMouseOverCell = col => this.setState({columnCandidate:col});
  onMouseClickCell = col => this.props.dispatch(confirmTurn({column : col}));
  onRestart = () => this.props.dispatch(restartGame());
  render() {
    return (
      <DisplayObjectContainer y={0}>
        <PlayerInput
          key="playerInput" ref="playerInput"
          columnCandidate={this.state.columnCandidate}
          turn={this.props.turn}
          lastCoin={this.props.lastCoin}
          onRestart={this.onRestart}
        />
        <DisplayObjectContainer y={100}>
          <Grid
            grid={this.props.grid}
            lastCoin={this.props.lastCoin}
            onMouseOverCell={this.onMouseOverCell}
            onMouseClickCell={this.onMouseClickCell}
          />
        </DisplayObjectContainer>
      </DisplayObjectContainer>
    );
  }
}

function select(state) {
  return {grid:state.grid, turn: state.turn, lastCoin: state.lastCoin}
}

export default connect(select)(Board)
