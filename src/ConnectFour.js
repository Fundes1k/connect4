import 'babel-polyfill'
//polyfill needed for array utils. Personally, I feel more confident using lodash

/*
Array representation (cols X rows), (7 X 6)
  | 0 1 2 3 4 5 6
5 | * * * * * * *
4 | * * * * * * *
3 | * * * * * * *
2 | * * * * * * *
1 | * * * * * * *
0 | * * * * * * *

each cell could be:
  0: empty
  1: players 1 coin
  2: players 2 coin
*/
export default class ConnectFour {
  getEmptyGrid() {
    return [0,0,0,0,0,0,0].map(c => [0,0,0,0,0,0])
  }
  placeCoin(grid,columnI,player) {
    let row = grid[columnI].findIndex( el => el === 0 )
    let checkPos = false
    if(row >= 0){
      grid[columnI][row] = player
      checkPos = this.checkPos(grid,columnI,row,player)
    }else
      grid = false
    return {grid: grid, end: checkPos, row: row}
  }
  //TODO try out http://stackoverflow.com/questions/7033165/algorithm-to-check-a-connect-four-field
  checkPos(grid,columnI,rowI, player) {
    if(this.checkHorizontalConsecutive(grid,columnI,rowI, player))
      return true
    if(this.checkDiagonalConsecutive(grid,columnI,rowI, player,1))
      return true
    if(this.checkDiagonalConsecutive(grid,columnI,rowI, player,-1))
      return true
    //check vertical and diagonal below candidates just if it is posible (y>=3)
    if(rowI >= 3)
      if(this.checkVerticalConsecutive(grid,columnI,rowI, player))
        return true

    return false
  }

  //we need to check the whole row, last placed coin could be one
  //that connected 2 rows. e.g (0101100) --> (0111100)
  checkHorizontalConsecutive(grid, x, y, value){
    let found = 0
    for(let i = 0; i <= 6; i++){
      if(grid[i][y] != value){
        found = 0
      }else{
        found++
        if(found == 4)
          return true
      }
    }
    return false
  }

  //we need to check as well the whole diagonal
  //top-left<->bottom-right diagonal direction=1
  //top-right<->bottom-left direction=-1
  checkDiagonalConsecutive(grid, x, y, value,direction){
    let found = 0, diagonalBottomStartX
    diagonalBottomStartX = x + y*direction
    for(let i = 0; i <= 5; i++){
      if( !grid[diagonalBottomStartX+(i*-direction)]
          || grid[diagonalBottomStartX+(i*-direction)][i] != value){
        found = 0
      }else{
        found++
        if(found == 4)
          return true
      }
    }

    return false
  }

  //vertical check, the last placed coin will be always the first one to check
  //hence we just need to check 3 positions bellow the last placed coin
  checkVerticalConsecutive(grid, x, y, value){
    for(let i = (y-1); i >= (y-3); i--){
      if(grid[x][i] != value)
        return false
    }
    return true
  }
}
