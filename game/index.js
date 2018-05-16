import { Map } from "immutable";
let board = Map();

export const move = (player, position) => {
  return { type: "MOVE", position, player };
};

export default function reducer(state = {board, turn: "X" }, action) {
  // TODO
  switch (action.type) {
    case "MOVE":
      return {turn: (state.turn === "X" ? "O" : "X"), board: state.board.setIn(action.position, action.player)}
    default:
      return state;
  }
}
