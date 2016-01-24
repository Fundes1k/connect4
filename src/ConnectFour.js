import 'babel-polyfill'
//polyfill needed for array utils. Personally, I feel more confident using lodash

export default class ConnectFour {
  getEmptyGrid() {
    return [0,0,0,0,0,0,0].map(c => [0,0,0,0,0,0])
  }
  placeCoin(grid,columnI,player) {
    let row = grid[columnI].findIndex( el => el === 0 )
    let checkPos = false
    if(row >= 0){
      checkPos = this.checkPos(grid,columnI,row,player)
      grid[columnI][row] = player
    }else
      grid = false
    return {grid: grid, end: checkPos, row: row}
  }
  //TODO investigate a graph based algorythm, although I think this aproach is more performant
  checkPos(grid,columnI,rowI, player) {

    //check horizontal candidates always
    if(columnI >= 3){
      if(this.checkHorizontalConsecutive(grid,columnI,rowI, player,-1))
        return true
    }
    if(columnI <= 3){
      if(this.checkHorizontalConsecutive(grid,columnI,rowI, player,1))
        return true
    }
    //check vertical and diagonal below candidates just if it is posible (y>=3)
    if(rowI >= 3){
      if(this.checkVerticalConsecutive(grid,columnI,rowI, player))
        return true
      if(columnI >= 3){
        if(this.checkHorizontalConsecutive(grid,columnI,rowI, player,-1,true))
          return true
      }
      if(columnI <= 3){
        if(this.checkHorizontalConsecutive(grid,columnI,rowI, player,1,true))
          return true
      }

    }
    return false
  }

  checkHorizontalConsecutive(grid, x, y, value, direction,checkDiagonal){
    let columnI, rowI
    for(let i = 1; i <= 3; i++){
      columnI = x + i*direction
      rowI = (checkDiagonal)? (y-i) : y
      if(grid[columnI][rowI] != value)
        return false
    }
    return true
  }

  checkVerticalConsecutive(grid, x, y, value){
    for(let i = (y-1); i >= (y-3); i--){
      if(grid[x][i] != value)
        return false
    }
    return true
  }
}
