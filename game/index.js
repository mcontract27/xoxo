import { Map } from "immutable";
let board = Map();

export const move = (player, position) => {
  return { type: "MOVE", position, player };
};
const checkSame = ( x, y, z) =>{
  if ( x === y && y === z && x !== '_'){
      return x
  }else{
    return null
  }
}

const winner = ( board ) => {
  for (let i = 0; i < 3; i++) {
    if ( checkSame(board.getIn([ i, 0]), board.getIn([i,1]), board.getIn([i,2]))) {
      return board.getIn([ i, 0])
    }
    if ( checkSame(board.getIn([ 0, i]), board.getIn([ 1,i]), board.getIn([ 2, i]))) {
      return board.getIn([ 0, i])
    }
  }

  if ( checkSame(board.getIn([ 0, 0 ]), board.getIn([ 1, 1]), board.getIn([ 2, 2]))) {
    return board.getIn([ 0, 0])
  }
  if ( checkSame(board.getIn([ 2, 0]), board.getIn([ 1, 1]), board.getIn([ 0, 2]))) {
    return board.getIn([ 2, 0])
  }

  for(let i = 0; i < 3; i++ ){
    for(let j =0; j < 3; j++ ){
      if(!board.hasIn([ i, j ])) return null
    }
  }
  return 'draw'
}

export default function reducer(state = {board, turn: "X" }, action) {
  // TODO
  switch (action.type) {
    case "MOVE":
      return {turn: (state.turn === "X" ? "O" : "X"), board: state.board.setIn(action.position, action.player)}
    default:
      return state;
  }
}
