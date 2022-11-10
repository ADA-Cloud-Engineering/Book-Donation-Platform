import styles from "./styles.module.css";
import { ImSpinner } from "react-icons/im";

const Button = ({ text, onClick, loading }) => {
  return (
    <div className={styles.default_btn} onClick={onClick}>
      {text} {loading && <ImSpinner className={styles.loading_spinner} />}
    </div>
  );
};

export default Button;
