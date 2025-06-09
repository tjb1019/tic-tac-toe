import '@fontsource-variable/outfit';
import styles from './App.module.css';
import { Game } from './components/game/game';
import { useState } from 'react';

function App() {
  const [gameId, setGameId] = useState(1);

  return (
    <main className={styles.root}>
      <section className={styles.appContent}>
        <Game key={gameId} onGameEnd={() => setGameId(prev => prev + 1)} />
      </section>
    </main>
  )
}

export default App
