import React, { useState } from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import styles from "./styles.module.css";

export const TransparentInput = React.forwardRef((props, ref) => {
  const { placeholder, width, type, textAlign, ...rest } = props;
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const handleFocus = () => {
    setTimeout(() => {
      ref?.current?.focus();
    }, 500);
  };
  const handleBlur = () => {
    let error =
      type == "file" ? "Please select file" : `Please enter ${placeholder}`;

    if (type == "file") {
      !ref?.current?.files[0]?.name && setError(error);
    } else {
      ref?.current?.value === "" && setError(error);
    }
  };
  return (
    <div
      className={`${styles.input} ${error ? styles.error : ""}`}
      style={{ width: width, textAlign: textAlign }}
      onClick={handleFocus}
    >
      <h3>{placeholder}</h3>
      <div style={{ display: "flex" }}>
        <input
          {...rest}
          type={showPassword ? "text" : type}
          name={props.name}
          ref={ref}
          onFocus={() => setError("")}
          onBlur={handleBlur}
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <ImEye onClick={() => setShowPassword(false)} />
            ) : (
              <ImEyeBlocked onClick={() => setShowPassword(true)} />
            )}
          </>
        )}
      </div>
      <p className={styles.errorText}>{error}</p>
    </div>
  );
});

export const TransparentDropDown = React.forwardRef((props, ref) => {
  const { placeholder, data, param, width, textAlign } = props;
  return (
    <div
      className={styles.input}
      style={{ width: width, textAlign: textAlign }}
    >
      <h3>{placeholder}</h3>
      <select ref={ref}>
        {data.map((d) => (
          <option key={Math.random() * 9898}>{param ? d[param] : d}</option>
        ))}
      </select>
    </div>
  );
});
