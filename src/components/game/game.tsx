import { useState } from 'react';
import { ResetButton } from '../reset-btn/reset-btn';
import styles from './game.module.css';
import clsx from 'clsx';
import { EndBanner } from '../end-banner/end-banner';

export type PlayerType = 'x' | 'o';
const defaultBoardState = ['', '', '', '', '', '', '', '', '',];

export function Game() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('x');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [board, setBoard] = useState<string[]>(defaultBoardState);
  const [score, setScore] = useState<Record<string, number>>({ p1Wins: 0, p2Wins: 0, ties: 0 });

  const onPlayerSelection = (player: PlayerType, index: number) => {
    setBoard(prev => {
      prev[index] = player;
      checkForWinner([...prev]);
      return [...prev];
    });
    setCurrentPlayer(prev => {
      if (prev === 'x') return 'o';
      else return 'x';
    });
  }

  const checkForWinner = (board: string[]) => {
    const splitBoard: Array<string[]> = [];
    while (board.length) {
      splitBoard.push(board.splice(0, 3));
    }
    
    // check for row win
    splitBoard.forEach((row) => {
      const firstChar = row[0];
      if (Boolean(firstChar) && row.every(char => char === firstChar)) {
        setGameOver(true);
        setScore(prev => {
          const p1Win = currentPlayer === 'x';
          const p2Win = currentPlayer === 'o';
          if (p1Win) prev.p1Wins += 1;
          else if (p2Win) prev.p2Wins += 1;
          return {...prev };
        });
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
      setGameOver(true);
    }
    

    // check for diagonal win
  }
  
  const onResetBtnClick = () => {
  }

  const onNextRoundClick = () => {
    setBoard([...defaultBoardState]);
    setGameOver(false);
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
            <ResetButton onBtnClick={onResetBtnClick} />
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
              <span className="heading-md">{score.p1Wins}</span>
            </span>
            <span className={clsx(styles.tile, styles.grey)}>
              <span>TIES</span>
              <span className="heading-md">{score.ties}</span>
            </span>
            <span className={clsx(styles.tile, styles.orange)}>
              <span>P2</span>
              <span className="heading-md">{score.p2Wins}</span>
            </span>
          </div>
        </div>
      {gameOver && <EndBanner player={'x'} onNextRoundClick={onNextRoundClick} />}
    </>
  )
}