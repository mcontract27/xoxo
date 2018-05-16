import { Map } from "immutable";
let board = Map();

const checkSame = (x, y, z) => {
  if (x === y && y === z && x !== "_") {
    return x;
  } else {
    return null;
  }
};

const winner = board => {
  for (let i = 0; i < 3; i++) {
    if (
      checkSame(board.getIn([i, 0]), board.getIn([i, 1]), board.getIn([i, 2]))
    ) {
      return board.getIn([i, 0]);
    }
    if (
      checkSame(board.getIn([0, i]), board.getIn([1, i]), board.getIn([2, i]))
    ) {
      return board.getIn([0, i]);
    }
  }

  if (
    checkSame(board.getIn([0, 0]), board.getIn([1, 1]), board.getIn([2, 2]))
  ) {
    return board.getIn([0, 0]);
  }
  if (
    checkSame(board.getIn([2, 0]), board.getIn([1, 1]), board.getIn([0, 2]))
  ) {
    return board.getIn([2, 0]);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board.hasIn([i, j])) return null;
    }
  }
  return "draw";
};

export const move = (player, position) => {
  return { type: "MOVE", position, player };
};

function turnReducer(turn = "X", action) {
  switch (action.type) {
    case "MOVE":
      return turn === "X" ? "O" : "X";
    default:
      return turn;
  }
}

function boardReducer(board = Map(), action) {
  switch (action.type) {
    case "MOVE":
      return board.setIn(action.position, action.player);
    default:
      return board;
  }
}

function bad(state, action) {
  if (action.type === "MOVE") {
    if (action.player != state.turn) return "Not your turn!";
    if (!action.position.join().match(/^[0-2],[0-2]/))
      return "invalid position";
    if (state.board.hasIn(action.position)) return "space already taken";
  }
  return null;
}

export default function reducer(state = { board, turn: "X" }, action) {
  // TODO
  const newBoard = boardReducer(state.board, action);
  const error = bad(state, action);
  if (error) {
    // console.log(error);
    return Object.assign({error}, state);
  } else {
    return {
      board: newBoard,
      turn: turnReducer(state.turn, action),
      winner: winner(newBoard)
    };
  }
}
