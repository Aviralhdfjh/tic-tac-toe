import { useState, useEffect } from 'react';

type Player = 'X' | 'O' | null;
type Board = Player[];

const calculateWinner = (squares: Board): Player => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const TicTacToe = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    const newWinner = calculateWinner(board);
    if (newWinner) {
      setWinner(newWinner);
    } else if (!board.includes(null)) {
      setIsDraw(true);
    }
  }, [board]);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  const getStatus = () => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a draw!";
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      padding: '2rem',
    }}>
      <h2 style={{
        fontSize: '2rem',
        color: 'inherit',
        margin: 0,
      }}>Tic Tac Toe</h2>
      
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 500,
        color: winner ? '#10b981' : isDraw ? '#f59e0b' : 'inherit',
      }}>
        {getStatus()}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '0.5rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}>
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: '5rem',
              height: '5rem',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              color: square === 'X' ? '#ef4444' : square === 'O' ? '#3b82f6' : 'inherit',
            }}
            onMouseOver={e => {
              if (!square && !winner) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseOut={e => {
              if (!square && !winner) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }
            }}
          >
            {square}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 500,
          background: '#6366f1',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={e => e.currentTarget.style.background = '#4f46e5'}
        onMouseOut={e => e.currentTarget.style.background = '#6366f1'}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe; 