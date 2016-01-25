import { CONFIRM_TURN, RESTART_GAME } from '../actions/game'

import ConnectFour from '../ConnectFour'
const connectFour = new ConnectFour()

//reducer should return new state, never mutate the current state
//e.g. state.grid.slice() passes the grid as value
function gameReducer(state, action) {

  switch (action.type) {
    case RESTART_GAME:
      return {grid: connectFour.getEmptyGrid(), turn: 0}
    case CONFIRM_TURN:
      const column = action.data.column
      const player = ((state.turn % 2) == 0)? 1: 2
      const nextGrid = connectFour.placeCoin(state.grid.slice(),column, player)
      if(nextGrid.grid){
        let newState = { grid: nextGrid.grid, turn: state.turn }
        if(nextGrid.end)
          newState.lastCoin = [column, nextGrid.row]
        else
          newState.turn++
        return newState
      }
    default:
      return state
  }
}


export default gameReducer
