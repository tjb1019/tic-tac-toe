import clsx from 'clsx';
import styles from './button.module.css';

interface ButtonProps {
  type?: 'primary' | 'secondary';
  label: string;
  onBtnClick: () => void;
}

export function Button({ type = 'primary', label, onBtnClick }: ButtonProps) {
  return (
    <button className={clsx(styles.root, 'uppercase', { [styles.secondary]: type === 'secondary' })} onClick={onBtnClick}>
      {label}
    </button>
  )
}