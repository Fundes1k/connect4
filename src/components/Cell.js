import React, { Component, PropTypes } from 'react';
import ReactPIXI from 'react-pixi'

const TilingSprite = ReactPIXI.TilingSprite;
const DisplayObjectContainer = ReactPIXI.DisplayObjectContainer;


export default class Cell extends Component {
  constructor() {
    super();
    this.scale = 104
  }
  getContent() {
    const alpha = (!this.props.interactive && !this.props.highlight)? 0.5 : 1
    let content = null
    if(this.props.content > 0){
      content = (
        <TilingSprite
          image={`./src/img/coin${this.props.content}.png`}
          width={88} height={88}
          key="content"
          y={this.scale/2} x={this.scale/2}
          anchor={new PIXI.Point(0.5,0.5)}
          alpha={alpha}
        />
      )
    }
    return content
  }
  getCell() {
    const alpha = (!this.props.interactive)? 0.1 : 1
    return (
      <TilingSprite
        image={`./src/img/cell.png`}
        width={this.scale} height={this.scale}
        key="cell"
        alpha={alpha}
        y={this.scale/2} x={this.scale/2}
        anchor={new PIXI.Point(0.5,0.5)}
      />
    )
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.content !== this.props.content
      || this.props.interactive !== nextProps.interactive
    )
  }
  render() {
    const cellContent = this.getContent()
    const cell = this.getCell()

    return (
      <DisplayObjectContainer
        x={this.props.x_ * this.scale} y={this.props.y_ * this.scale}
        width={this.scale} height={this.scale}
        ref="cellContainer"
        interactive={this.props.interactive}
        mouseover={ data => this.props.onMouseOver(this.props.x_) }
        mousedown={ data => this.props.onMouseClick(this.props.x_) }
      >
        {cellContent}
        {cell}
      </DisplayObjectContainer>
    );
  }
}

/*
props:
  x_,y_: grid position
  content:
    0: empty
    1: player1
    2: player2
  interactive : false if somebody won. we can spare the mouse listeners
  highlight: if somebody won, wil be true if that was the wining move
*/
Cell.propTypes = {
  interactive: PropTypes.bool.isRequired,
  highlight: PropTypes.bool,
  content: PropTypes.number.isRequired,
  x_: PropTypes.number.isRequired,
  y_: PropTypes.number.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseClick: PropTypes.func.isRequired
}
