import '@fontsource-variable/outfit';
import styles from './App.module.css';
import { Game } from './components/game/game';

function App() {

  return (
    <main className={styles.root}>
      <section className={styles.appContent}>
        <Game />
      </section>
    </main>
  )
}

export default App
