import React, { useEffect } from "react";
import { ImSpinner } from "react-icons/im";
import { useLocation, useNavigate } from "react-router";
import Banner from "../../components/Header/Banner";
import styles from "./styles.module.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  const next = location.state?.next;

  useEffect(() => {
    setTimeout(() => {
      navigate(next);
    }, 3000);
  }, []);

  return (
    <div>
      <Banner />
      <div className={styles.success_page}>
        <h3>{message}</h3>
        <ImSpinner />
      </div>
    </div>
  );
};

export default SuccessPage;
