import React, { Component, PropTypes } from 'react';
import ReactPIXI from 'react-pixi'

const TilingSprite = ReactPIXI.TilingSprite;
let Text = ReactPIXI.Text;
const DisplayObjectContainer = ReactPIXI.DisplayObjectContainer;


export default class PlayerInput extends Component {
  constructor() {
    super();
    this.scale = 88
    this.cellScale = 104
  }
  getCoin(x, player) {
    if(!this.props.lastCoin)
      return (
        <TilingSprite
          image={`./src/img/coin${player}.png`}
          width={this.scale} height={this.scale}
          y={0} x={(x + ((this.cellScale - this.scale) / 2))}
          key='coin'
        />
      )
    else
      null
  }
  getText(player) {
    let text
    if(this.props.turn < 41)
      text = `Player ${player} ${(this.props.lastCoin)? 'won' : 'turn'}`
    else
      text = 'Draw'

    return (
      <Text text={text}
        width={90} height={10}
        x={740} y={0}
        key='text'
      />
    )
  }
  getActions(){
    if(this.props.lastCoin || this.props.turn == 41)
      return (
        <Text text='Restart'
          width={90} height={10}
          x={740} y={25}
          key='restart'
          interactive={true}
          mousedown={ data => this.props.onRestart() }
        />
      )
    else
      return null
  }
  render() {
    const player = ((this.props.turn % 2) == 0)? 1: 2
    const col = this.props.columnCandidate
    const x = (col)? col * this.cellScale : 0

    return (
      <DisplayObjectContainer>
        {this.getCoin(x, player)}
        {this.getText(player)}
        {this.getActions()}
      </DisplayObjectContainer>
    );
  }
}

/*
props:
  lastCoin: position of the winning move
  columnCandidate: index of the currently hovered column
  turn: current turn
  onRestart: mouse click listener for restart button.
*/
PlayerInput.propTypes = {
  lastCoin: PropTypes.array,
  columnCandidate: PropTypes.number,
  turn: PropTypes.number,
  onRestart: PropTypes.func.isRequired
}
