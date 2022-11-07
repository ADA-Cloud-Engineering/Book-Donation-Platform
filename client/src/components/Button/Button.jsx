import styles from "./styles.module.css";

const Button = ({ text, onClick }) => {
  return <div className={styles.default_btn}>{text}</div>;
};

export default Button;
