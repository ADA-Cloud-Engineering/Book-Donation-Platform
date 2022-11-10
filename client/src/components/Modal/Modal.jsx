import Button from "../Button/Button";
import styles from "./modal.css";

const Modal = ({ handleClose, show, message, doAction, doActionMessage }) => {
  const showHideClassName = show
    ? `${styles.modal} ${styles.display_block}`
    : `${styles.modal} ${styles.display_block}`;

  return (
    <div className={showHideClassName}>
      <section className={styles.modal_main}>
        {message}

        <div>
          {doAction && <Button onClick={doAction} text={doActionMessage} />}

          <Button onClick={handleClose} text="Cancel" />
        </div>
      </section>
    </div>
  );
};

export default Modal;
