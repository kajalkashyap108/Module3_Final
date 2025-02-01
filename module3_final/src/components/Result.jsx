import React, { useState, useEffect, useContext } from "react";
import { fetchUserResult } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import styles from "./Result.module.css";

const Result = () => {
  const [result, setResult] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadResult = async () => {
      try {
        const response = await fetchUserResult(user.userId);
        if (response.success) {
          setResult(response);
        }
      } catch (error) {
        console.error("Error fetching result:", error);
      }
    };
    loadResult();
  }, [user]);

  if (!result) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz Result</h1>
      <div className={styles.card}>
        <p className={styles.score}>
          You answered {result.score} out of {result.totalQuestions} questions
          correctly.
        </p>
      </div>
    </div>
  );
};

export default Result;