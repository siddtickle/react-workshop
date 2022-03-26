import "./App.css";

import React, { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  // const questions = ["question 1", "question 2", "question 3"];

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy")
      .then((res) => res.json())
      .then((res) => {
        setQuestions(res.results);
      });
  }, []); // show with and without ,[] to show infinite api calls

  function Question({ question }) {
    const [answered, setAnswered] = useState(false);
    const [result, setResult] = useState("");

    const storeChoices = (question) => {
      let answerChoices = question.incorrect_answers;
      answerChoices = [...answerChoices, question.correct_answer];
      return answerChoices;
    };

    return (
      <div>
        {/* Question Title */}
        <h4>{question.question}</h4>
        <h6>{result}</h6>
        {/* Question Choices */}
        <div>
          {storeChoices(question).map((choice) => (
            <button
              disabled={answered}
              onClick={() => {
                setAnswered(true);
                if (choice === question.correct_answer) setResult("✅");
                else setResult("❌");
              }}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Trivia App</h1>

      {/* <button
        onClick={() => {
          setQuestions([...questions, "question"]);
        }}
      >
        Add Question
      </button> */}

      {questions.map((question) => (
        <Question question={question}></Question> // put question first, then switch to {question} to show importance of curly braces
      ))}
    </div>
  );
}

export default App;
