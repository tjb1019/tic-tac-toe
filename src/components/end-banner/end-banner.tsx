import clsx from 'clsx';
import type { PlayerType } from '../game/game';
import styles from './end-banner.module.css';
import { Button } from '../button/button';

const playerMap: Record<PlayerType, { label: string, color: string }> = {
  x: {
    label: 'Player 1',
    color: 'blue'
  },
  o: {
    label: 'Player 2',
    color: 'orange'
  },
};

interface EndBannerProps {
  player: PlayerType;
  onNextRoundClick: () => void;
}

export function EndBanner({ player, onNextRoundClick }: EndBannerProps) {
  
  
  return (
    <div className={styles.root}>
      <div className={styles.banner}>
        <span className="heading-xs uppercase">{playerMap[player].label} wins!</span>
        <div className={styles.middle}>
          <img src={`${player}-icon.svg`} />
          <span className={clsx(styles.mainText, 'heading-lg', 'uppercase', { [styles.blue]: playerMap[player].color === 'blue', [styles.orange]: playerMap[player].color === 'orange' })}>TAKES THE ROUND</span>
        </div>
        <div className={styles.actions}>
          <Button label="Quit" type="secondary" onBtnClick={() => {}} />
          <Button label="Next Round" onBtnClick={onNextRoundClick} />
        </div>
      </div>
    </div>
  )
}