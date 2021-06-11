import { VFC, useState, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Squareの中身の型、XかOか空（null）の3通り
type FillSquare = 'X' | 'O' | null;

// Squareコンポーネントの型
type Square = {
  value: FillSquare;
  onClick: () => void;
};

const Square: VFC<Square> = (props) => {
  const { value, onClick } = props;

  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board: VFC = () => {
  const [squares, setSquares] = useState<FillSquare[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = (i: number): void => {
    const squaresSlice = squares.slice();
    squaresSlice[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresSlice);
    setXIsNext((c) => !c);
  };

  const renderSquare = (i: number): ReactElement => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const status = `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game: VFC = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
);

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
