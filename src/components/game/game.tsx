import { useState } from 'react';
import { ResetButton } from '../reset-btn/reset-btn';
import styles from './game.module.css';
import clsx from 'clsx';
import { EndBanner } from '../end-banner/end-banner';

export type PlayerType = 'x' | 'o';

interface GameProps {
  onGameEnd: () => void;
}

export function Game({ onGameEnd }: GameProps) {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('x');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [board, setBoard] = useState<string[]>(new Array(9).fill(''));
  const [winner, setWinner] = useState<PlayerType | null>(null);
  const p1Wins = localStorage.getItem('p1Wins') || '0';
  const p2Wins = localStorage.getItem('p2Wins') || '0';
  const ties = localStorage.getItem('ties') || '0';

  const onPlayerSelection = (player: PlayerType, index: number) => {
    setBoard(prev => {
      prev[index] = player;
      const gameOver = checkForWinner([...prev]);
      if (!gameOver) toggleCurrentPlayer();
      return [...prev];
    });
  }

  const checkForWinner = (board: string[]) => {
    // check for tie
    if (board.every(Boolean) && board.length >= 9) {
      endGame(true);
      return false;
    }
    
    const splitBoard: Array<string[]> = [];
    while (board.length) {
      splitBoard.push(board.splice(0, 3));
    }
    
    // check for row win
    splitBoard.forEach((row) => {
      const firstChar = row[0];
      if (Boolean(firstChar) && row.every(char => char === firstChar)) {
        endGame();
        return true;
      }
    });

    // check for column win
    const firstCol: string[] = [];
    const secondCol: string[] = [];
    const thirdCol: string[] = [];
    splitBoard.forEach((row) => {
      row.forEach((col, i) => {
        if (i === 0) firstCol.push(col);
        if (i === 1) secondCol.push(col);
        if (i === 2) thirdCol.push(col);
      })
    });
    const firstColChar = firstCol[0];
    const secondColChar = secondCol[0];
    const thirdColChar = thirdCol[0];
    if (Boolean(firstColChar) && firstCol.every(char => char === firstColChar) ||
    Boolean(secondColChar) && secondCol.every(char => char === secondColChar) ||
    Boolean(thirdColChar) && thirdCol.every(char => char === thirdColChar)) {
      endGame();
      return true;
    }
    

    // check for diagonal win
    const diagonalOne = [splitBoard[0][0], splitBoard[1][1], splitBoard[2][2]]
    const diagonalTwo = [splitBoard[0][2], splitBoard[1][1], splitBoard[2][0]]
    if (diagonalOne.every(char => Boolean(char) && char === diagonalOne[0]) ||
      diagonalTwo.every(char => Boolean(char) && char === diagonalTwo[0])
    ) {
      endGame();
      return true;
    }
  }

  const toggleCurrentPlayer = () => {
    setCurrentPlayer(prev => {
      if (prev === 'x') return 'o';
      else return 'x';
    });
  }

  const endGame = (tie?: boolean) => {
    setGameOver(true);
    // update standings
    if (tie) {
      const tieCount = Number(ties) + 1;
      localStorage.setItem('ties', String(tieCount));
      setWinner(null);
    } else {
      const p1Win = currentPlayer === 'x';
      const p2Win = currentPlayer === 'o';
      
      if (p1Win) {
        const winCount = Number(p1Wins) + 1;
        localStorage.setItem('p1Wins', String(winCount));
        setWinner('x');
      } else if (p2Win) {
        const winCount = Number(p2Wins) + 1;
        localStorage.setItem('p2Wins', String(winCount));
        setWinner('o');
      }
    }
  }

  const onNewGame = () => {
    onGameEnd();
  }
  
  return (
    <>
        <div className={styles.root}>
          <div className={styles.header}>
            <span className={styles.gameIcons}>
              <img src="x-icon.svg" />
              <img src="o-icon.svg" />
            </span>
            <span className={styles.currentTurn}>
              <img src={`${currentPlayer}-icon.svg`} />
              <span>TURN</span>
            </span>
            <ResetButton onBtnClick={onNewGame} />
          </div>
          <div className={styles.board}>
            {board.map((tile, index) => {
              return <div key={index} className={clsx(styles.tile, { [styles.disabled]: Boolean(tile) })} onClick={() => onPlayerSelection(currentPlayer, index)}>
                {tile && <img src={`${tile}-icon.svg`} />}
              </div>
            }, 1)}
          </div>
          <div className={styles.scoreBoard}>
            <span className={clsx(styles.tile, styles.blue)}>
              <span>P1</span>
              <span className="heading-md">{p1Wins}</span>
            </span>
            <span className={clsx(styles.tile, styles.grey)}>
              <span>TIES</span>
              <span className="heading-md">{ties}</span>
            </span>
            <span className={clsx(styles.tile, styles.orange)}>
              <span>P2</span>
              <span className="heading-md">{p2Wins}</span>
            </span>
          </div>
        </div>
      {gameOver && <EndBanner player={currentPlayer} winner={Boolean(winner)} onNextRoundClick={onNewGame} />}
    </>
  )
}