import styles from './reset-btn.module.css';

interface ResetButtonProps {
  onBtnClick: () => void;
}

export function ResetButton({ onBtnClick }: ResetButtonProps) {
  
  
  return (
    <button className={styles.root} onClick={onBtnClick}>
      <img src="reset.svg" />
    </button>
  )
}