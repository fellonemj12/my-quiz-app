import React, { useState } from 'react';
import './index.css';

const questions = [
  {
    id: 1,
    text: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    id: 2,
    text: "Which library or framework is developed by Meta (Facebook)?",
    options: ["Angular", "Vue", "React", "Svelte"],
    answer: 2
  },
  {
    id: 3,
    text: "What language is used for styling web pages?",
    options: ["Python", "CSS", "Java", "C++"],
    answer: 1
  },
  {
    id: 4,
    text: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<javascript>", "<js>", "<scripting>"],
    answer: 0
  },
  {
    id: 5,
    text: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: 2
  },
  {
    id: 6,
    text: "Which of the following is a JavaScript package manager?",
    options: ["Node.js", "TypeScript", "npm", "Vite"],
    answer: 2
  },
  {
    id: 7,
    text: "What year was JavaScript initially released?",
    options: ["1991", "1995", "2000", "2005"],
    answer: 1
  },
  {
    id: 8,
    text: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- Comment -->", "/* Comment */", "// Comment", "** Comment **"],
    answer: 2
  },
  {
    id: 9,
    text: "What hook is used to manage state in a React functional component?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    answer: 1
  },
  {
    id: 10,
    text: "Which company created the TypeScript language?",
    options: ["Google", "Microsoft", "Apple", "Meta"],
    answer: 1
  },
  {
    id: 11,
    text: "What does SQL stand for?",
    options: [
      "Simple Query Language",
      "Structured Question Language",
      "Structured Query Language",
      "System Query Language"
    ],
    answer: 2
  },
  {
    id: 12,
    text: "Which HTML tag is used to define an unordered list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: 1
  },
  {
    id: 13,
    text: "What is the primary extension for TypeScript source files?",
    options: [".js", ".ts", ".tsx", ".tx"],
    answer: 1
  },
  {
    id: 14,
    text: "Which HTTP status code means 'Not Found'?",
    options: ["200", "301", "404", "500"],
    answer: 2
  },
  {
    id: 15,
    text: "What tool is commonly used as a fast frontend build tool and development server?",
    options: ["Vite", "Webpack", "Grunt", "Bower"],
    answer: 0
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === questions[currentQuestion].answer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    const updatedHistory = [...answerHistory, isCorrect];
    setAnswerHistory(updatedHistory);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div style={{ maxWidth: "560px", margin: "30px auto", padding: "24px", fontFamily: "Arial, sans-serif", border: "2px solid #333", borderRadius: "12px", background: "#fdfdfd", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      
      <h2 style={{ textAlign: "center", marginBottom: "15px", color: "#222" }}>My Quiz App</h2>

      {!isFinished ? (
        <div>
          {/* Progress Tracker Bar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px", padding: "12px", background: "#f1f5f9", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
            <div style={{ fontSize: "13px", fontWeight: "bold", color: "#475569" }}>
              Progress Tracker ({answerHistory.length}/{questions.length})
            </div>
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {questions.map((_, index) => {
                let boxContent = "·";
                let boxBg = "#e2e8f0";
                let boxColor = "#64748b";

                if (index < answerHistory.length) {
                  if (answerHistory[index] === true) {
                    boxContent = "✔";
                    boxBg = "#dcfce7";
                    boxColor = "#16a34a";
                  } else {
                    boxContent = "✖";
                    boxBg = "#fee2e2";
                    boxColor = "#dc2626";
                  }
                } else if (index === currentQuestion) {
                  boxBg = "#bfdbfe";
                  boxColor = "#1d4ed8";
                  boxContent = String(index + 1);
                }

                return (
                  <div 
                    key={index}
                    style={{ 
                      width: "28px", 
                      height: "28px", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      background: boxBg, 
                      color: boxColor,
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      fontSize: "12px"
                    }}
                  >
                    {boxContent}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Card Box */}
          <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px", background: "#ffffff", marginBottom: "20px" }}>
            <h4 style={{ marginTop: "0", marginBottom: "15px", color: "#111" }}>
              Question {currentQuestion + 1}: {questions[currentQuestion].text}
            </h4>

            {/* Options List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {questions[currentQuestion].options.map((option, index) => (
                <label 
                  key={index} 
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    padding: "10px 12px", 
                    border: selectedOption === index ? "2px solid #2563eb" : "1px solid #ddd", 
                    borderRadius: "6px", 
                    cursor: "pointer",
                    background: selectedOption === index ? "#eff6ff" : "#fafafa"
                  }}
                >
                  <input 
                    type="radio" 
                    name="quiz-option" 
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                    style={{ marginRight: "10px" }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div style={{ textAlign: "right" }}>
            <button 
              onClick={handleNext}
              disabled={selectedOption === null}
              style={{ 
                padding: "10px 24px", 
                fontSize: "15px", 
                fontWeight: "bold",
                cursor: selectedOption === null ? "not-allowed" : "pointer", 
                background: selectedOption === null ? "#cbd5e1" : "#2563eb", 
                color: "white", 
                border: "none", 
                borderRadius: "6px" 
              }}
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h3>Quiz Completed! 🎉</h3>
          <p style={{ fontSize: "18px" }}>Your Final Score: <strong>{score} / {questions.length}</strong></p>
          <button 
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setAnswerHistory([]);
              setSelectedOption(null);
              setIsFinished(false);
            }}
            style={{ marginTop: "15px", padding: "10px 20px", background: "#2563eb", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}