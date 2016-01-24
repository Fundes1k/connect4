export const CONFIRM_TURN = 'CONFIRM_TURN'
export const RESTART_GAME = 'RESTART_GAME'

 export function confirmTurn(data) {
   return { type: CONFIRM_TURN , data: data}
 }

export function restartGame() {
  return { type: RESTART_GAME }
}
