import styles from "./Header.module.css";

type Props = {
  onHojeClick: () => void;
};

function Header({ onHojeClick }: Props) {
  return (
    <header className={styles.header}>
      <h1>agenda.</h1>
      <button onClick={onHojeClick} className={styles.button}>
        Hoje
      </button>
    </header>
  );
}

export default Header;
