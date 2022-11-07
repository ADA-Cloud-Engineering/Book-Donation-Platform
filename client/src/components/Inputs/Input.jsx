import styles from "./styles.module.css";

export const TransparentInput = ({ placeholder }) => {
  return (
    <div className={styles.input}>
      <h3>{placeholder}</h3>
      <input />
    </div>
  );
};

export const TransparentDropDown = ({ placeholder, data, param }) => {
  return (
    <div className={styles.input}>
      <h3>{placeholder}</h3>
      <select>
        {data.map((d) => (
          <option>{param ? d[param] : d}</option>
        ))}
      </select>
    </div>
  );
};
