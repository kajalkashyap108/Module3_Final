import React, { useState } from "react";
import styles from "./QuizItem.module.css";

const QuizItem = ({ question, selectedAnswer, onAnswerSelect }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const isCorrect = selectedAnswer === question.answer;

  return (
    <div className={styles.card}>
      <h3 className={styles.question}>{question.question}</h3>
      {question.options.map((option, index) => (
        <div key={index} className={styles.option}>
          <label>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(question.id, option)}
            />
            {option}
          </label>
        </div>
      ))}
      {selectedAnswer && (
        <p className={isCorrect ? styles.correct : styles.incorrect}>
          {isCorrect ? "Correct!" : "Incorrect!"}
        </p>
      )}
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className={styles.showAnswerButton}
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      {showAnswer && (
        <p className={styles.correctAnswer}>
          Correct Answer: {question.answer}
        </p>
      )}
    </div>
  );
};

export default QuizItem;