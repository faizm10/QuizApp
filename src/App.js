import React, { useState } from 'react';
import './App.css';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Which programming language is this app built with?',
    options: ['Java', 'Python', 'JavaScript', 'C++'],
    correctAnswer: 'JavaScript',
  },
  {
    question: 'What is the name of school that Faiz attends?',
    options: ['Guelph', 'Guelph-Humber', 'Waterloo', 'UofT'],
    correctAnswer: 'Guelph',
  },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerClick = (selectedAnswer) => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;

    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = { selectedAnswer, isCorrect };
      return updatedAnswers;
    });

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setUserAnswers(Array(questions.length).fill(null));
  };

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} out of {questions.length}</h2>
          <div>
            {userAnswers.map((answer, index) => (
              <p key={index}>
                Question {index + 1}: Your answer - {answer.selectedAnswer},{' '}
                {answer.isCorrect ? 'Correct!' : `Correct answer - ${questions[index].correctAnswer}`}
              </p>
            ))}
          </div>
          <button onClick={resetQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion].question}</p>
          <div className="answer-options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;