import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestions, submitQuiz } from "../utils/api";
import QuizItem from "./QuizItem";
import { AuthContext } from "../context/AuthContext";
import styles from "./Quiz.module.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetchQuestions();
        if (response.success) {
          setQuestions(response.questions);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    loadQuestions();
  }, []);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = async () => {
    try {
      const response = await submitQuiz(user.userId, answers);
      if (response.success) {
        navigate("/result");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz Page</h1>
      {questions.map((question) => (
        <QuizItem
          key={question.id}
          question={question}
          selectedAnswer={answers[question.id]}
          onAnswerSelect={handleAnswerSelect}
        />
      ))}
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit Quiz
      </button>
    </div>
  );
};

export default Quiz;