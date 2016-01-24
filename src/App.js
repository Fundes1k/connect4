import React, { Component } from 'react';
import ReactPIXI from 'react-pixi'

import {compose} from 'redux';
import persistState from 'redux-localstorage'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import games from './reducers/Game'

import Board from './components/Board'

const Stage = ReactPIXI.Stage

//TODO use Map instead of hash
let initalGameStruct = {
  grid: [0,0,0,0,0,0,0].map(c => [0,0,0,0,0,0]),
  turn: 0
}

const createPersistentStore = compose(
  persistState([], {key: 'game'})
)(createStore);

const store = createPersistentStore(games,initalGameStruct);

export default class App extends Component {
  render() {
    return (
      <Stage width={1000} height={800} >
        <Provider store={store}>
          <Board />
        </Provider>
      </Stage>
    )
  }
}
