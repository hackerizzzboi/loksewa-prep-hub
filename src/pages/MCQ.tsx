import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw, ChevronRight } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  topic: string;
}

const mcqData: Question[] = [
  {
    id: 1,
    question: "Which of the following is an example of an Operating System?",
    options: ["Microsoft Word", "Windows 11", "Google Chrome", "Adobe Photoshop"],
    correct: 1,
    topic: "Operating Systems",
  },
  {
    id: 2,
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing Unit"],
    correct: 0,
    topic: "Computer Fundamentals",
  },
  {
    id: 3,
    question: "Which shortcut key is used to copy in MS Office?",
    options: ["Ctrl + V", "Ctrl + X", "Ctrl + C", "Ctrl + Z"],
    correct: 2,
    topic: "MS Office",
  },
  {
    id: 4,
    question: "What is the full form of RAM?",
    options: ["Random Access Memory", "Read Access Memory", "Run Access Memory", "Rapid Access Memory"],
    correct: 0,
    topic: "Computer Fundamentals",
  },
  {
    id: 5,
    question: "Which protocol is used for secure web browsing?",
    options: ["HTTP", "FTP", "HTTPS", "SMTP"],
    correct: 2,
    topic: "Networking",
  },
  {
    id: 6,
    question: "In MS Excel, which function is used to find the average?",
    options: ["SUM()", "COUNT()", "AVERAGE()", "MAX()"],
    correct: 2,
    topic: "MS Office",
  },
  {
    id: 7,
    question: "What type of software is MySQL?",
    options: ["Operating System", "Word Processor", "Database Management System", "Web Browser"],
    correct: 2,
    topic: "DBMS",
  },
  {
    id: 8,
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correct: 1,
    topic: "Web Technology",
  },
];

const topics = ["All Topics", "Computer Fundamentals", "Operating Systems", "MS Office", "Networking", "DBMS", "Web Technology"];

const MCQ = () => {
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const filteredQuestions = selectedTopic === "All Topics" 
    ? mcqData 
    : mcqData.filter(q => q.topic === selectedTopic);

  const currentQuestion = filteredQuestions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    if (selectedAnswer === currentQuestion.correct) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const getOptionClass = (index: number) => {
    let base = "quiz-option";
    if (!showResult && selectedAnswer === index) {
      return `${base} selected`;
    }
    if (showResult) {
      if (index === currentQuestion.correct) {
        return `${base} correct`;
      }
      if (selectedAnswer === index && index !== currentQuestion.correct) {
        return `${base} incorrect`;
      }
    }
    return base;
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">MCQ Practice</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Test your knowledge with topic-wise questions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Score: <span className="text-accent font-semibold">{score}</span> / {answeredQuestions.length}
            </span>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1" /> Reset
            </Button>
          </div>
        </div>

        {/* Topic Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setSelectedTopic(topic);
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setShowResult(false);
              }}
              className={`nav-link ${selectedTopic === topic ? "active" : ""}`}
            >
              {topic}
            </button>
          ))}
        </div>

        {filteredQuestions.length > 0 ? (
          <div className="hero-gradient rounded-2xl p-6 border border-[hsla(218,27%,59%,0.2)]">
            <div className="flex items-center justify-between mb-4">
              <span className="badge-primary">{currentQuestion.topic}</span>
              <span className="text-sm text-muted-foreground">
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
            </div>

            <h2 className="text-lg font-medium mb-6">{currentQuestion.question}</h2>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={getOptionClass(index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && index === currentQuestion.correct && (
                      <CheckCircle className="w-5 h-5 text-accent ml-auto" />
                    )}
                    {showResult && selectedAnswer === index && index !== currentQuestion.correct && (
                      <XCircle className="w-5 h-5 text-destructive ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {!showResult ? (
                <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={currentIndex >= filteredQuestions.length - 1}>
                  Next Question <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="feature-card text-center py-12">
            <p className="text-muted-foreground">No questions available for this topic.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MCQ;
