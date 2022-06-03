import React, { useState }  from "react";
import Board from "./components/Board";
import { calculateWinner } from './helpers';
import History from "./components/History";
import StatusMessage from "./components/StatusMessage";
import "./styles/root.scss";


const NEW_GAME = [
  { board: Array(9).fill(null), isXNext: true},
];

const App = () => {
  const [history, setHistory] = useState(NEW_GAME);

const [currentMove, setCurrentMove] = useState(0);

const current = history[currentMove];
// const [isXNext, setIsXNext] = useState(false);

// console.log(history);
const { winner, winningSquares } = calculateWinner(current.board);




const handleSquareClick = (position) => {

    if (current.board[position] || winner) {
        return;
    }

    setHistory((prev) => {

        const last = prev[prev.length - 1];


        const newBoard = last.board.map((square, pos) => {
            if (pos === position) {
                // return 'X';
                return last.isXNext ? 'X' : 'O';
            }

            return square;
        });

        return prev.concat({ board: newBoard, isXNext: !last.isXNext});
    });

    // setIsXNext((prev) => !prev);
    setCurrentMove(prev => prev + 1);

};



const moveTo = (move) => {
  setCurrentMove(move);
};

const onNewGame = () => {
  setHistory(NEW_GAME);
  setCurrentMove(0);
}

  return(
    <div className="app">
      <h1>Tic <span className="text-orange">Tac</span> Toe !!</h1>  
      <StatusMessage winner={winner} current={current} />  
      {/* <h3>{message}</h3>  */}    
      <Board board={current.board} handleSquareClick={handleSquareClick} winningSquares={winningSquares} />       
      <button type="button" onClick={onNewGame} className={`btn-reset ${winner ? 'active' : ' '}`}>New Game</button>
      <h4 style={{fontWeight: 'normal'}}>Current Game History</h4>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls"></div>
    </div>
    
  );
  
};

export default App;
