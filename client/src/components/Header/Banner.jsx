import { AiOutlineHeart } from "react-icons/ai";
import styles from "./styles.module.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <AiOutlineHeart className={styles.pink_heart} />
      <p className={styles.banner_text}>
        Giving to the poor does not limit you.
      </p>
    </div>
  );
};

export default Banner;
