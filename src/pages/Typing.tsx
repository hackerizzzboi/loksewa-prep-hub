import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { RotateCcw, Play, Pause, Clock, Target, Zap } from "lucide-react";
import { toast } from "sonner";

const englishTexts = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is commonly used for typing practice.",
  "Computer operators play a vital role in government offices. They manage data entry, maintain records, and ensure smooth operation of computer systems.",
  "Nepal Public Service Commission conducts examinations for various government positions. Candidates must demonstrate proficiency in computer operations.",
  "Microsoft Office suite includes Word, Excel, PowerPoint, and Access. These applications are essential tools for any computer operator.",
  "A database management system helps organize and store data efficiently. SQL is the standard language used to interact with databases.",
];

const nepaliTexts = [
  "नेपाल एक सुन्दर देश हो। यहाँ हिमाल, पहाड र तराई तीनवटा भौगोलिक क्षेत्र छन्।",
  "कम्प्युटर अपरेटरको परीक्षामा टाइपिङ परीक्षा अनिवार्य हुन्छ।",
  "लोकसेवा आयोगले विभिन्न सरकारी पदहरूको लागि परीक्षा सञ्चालन गर्दछ।",
];

type Language = "english" | "nepali";

const Typing = () => {
  const [language, setLanguage] = useState<Language>("english");
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);

  const getRandomText = useCallback((lang: Language) => {
    const texts = lang === "english" ? englishTexts : nepaliTexts;
    return texts[Math.floor(Math.random() * texts.length)];
  }, []);

  useEffect(() => {
    setCurrentText(getRandomText(language));
  }, [language, getRandomText]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      toast.success(`Time's up! You typed at ${wpm} WPM with ${accuracy}% accuracy.`);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, wpm, accuracy]);

  useEffect(() => {
    if (startTime && isRunning) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const words = userInput.trim().split(/\s+/).filter(w => w.length > 0).length;
      setWpm(Math.round(words / elapsedMinutes) || 0);
    }
  }, [userInput, startTime, isRunning]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isRunning) return;
    
    const value = e.target.value;
    setUserInput(value);
    setTotalChars(value.length);

    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === currentText[i]) {
        correct++;
      }
    }
    setCorrectChars(correct);
    setAccuracy(value.length > 0 ? Math.round((correct / value.length) * 100) : 100);

    if (value === currentText) {
      setIsRunning(false);
      toast.success("Perfect! You completed the text accurately.");
    }
  };

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now());
    setUserInput("");
    setWpm(0);
    setAccuracy(100);
    setTotalChars(0);
    setCorrectChars(0);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(60);
    setUserInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTotalChars(0);
    setCorrectChars(0);
    setCurrentText(getRandomText(language));
  };

  const renderText = () => {
    return currentText.split("").map((char, index) => {
      let className = "text-muted-foreground";
      if (index < userInput.length) {
        className = userInput[index] === char ? "text-accent" : "text-destructive bg-destructive/20";
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Typing Practice</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Improve your typing speed for the practical exam
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setLanguage("english");
                handleReset();
              }}
              className={`nav-link ${language === "english" ? "active" : ""}`}
            >
              English
            </button>
            <button
              onClick={() => {
                setLanguage("nepali");
                handleReset();
              }}
              className={`nav-link ${language === "nepali" ? "active" : ""}`}
            >
              नेपाली
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="stat-card flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Time Left</div>
              <div className="text-lg font-semibold">{timeLeft}s</div>
            </div>
          </div>
          <div className="stat-card flex items-center gap-3">
            <Zap className="w-5 h-5 text-accent" />
            <div>
              <div className="text-xs text-muted-foreground">WPM</div>
              <div className="text-lg font-semibold">{wpm}</div>
            </div>
          </div>
          <div className="stat-card flex items-center gap-3">
            <Target className="w-5 h-5 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
              <div className="text-lg font-semibold">{accuracy}%</div>
            </div>
          </div>
          <div className="stat-card flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center text-xs">
              {correctChars}
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Correct</div>
              <div className="text-lg font-semibold">{correctChars}/{totalChars}</div>
            </div>
          </div>
        </div>

        {/* Typing Area */}
        <div className="hero-gradient rounded-2xl p-6 border border-[hsla(218,27%,59%,0.2)] mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-primary">{language === "english" ? "English" : "Nepali"} Typing</span>
            <span className="text-xs text-muted-foreground">
              Target: {language === "english" ? "40 WPM" : "25 WPM"}
            </span>
          </div>

          <div className="mb-6 p-4 rounded-lg bg-secondary/30 border border-border font-mono text-lg leading-relaxed">
            {renderText()}
          </div>

          <textarea
            value={userInput}
            onChange={handleInputChange}
            disabled={!isRunning}
            placeholder={isRunning ? "Start typing..." : "Click Start to begin"}
            className="w-full h-32 p-4 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none font-mono text-lg resize-none disabled:opacity-50"
          />

          <div className="flex gap-3 mt-4">
            {!isRunning ? (
              <Button onClick={handleStart} disabled={timeLeft === 0}>
                <Play className="w-4 h-4 mr-1" /> Start
              </Button>
            ) : (
              <Button onClick={handlePause} variant="outline">
                <Pause className="w-4 h-4 mr-1" /> Pause
              </Button>
            )}
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1" /> Reset
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="feature-card">
          <h3 className="font-semibold mb-3">Typing Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
              <p>Focus on accuracy first, speed will come with practice</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
              <p>Use all fingers and maintain proper hand position</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
              <p>Practice daily for at least 30 minutes</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
              <p>For Nepali, use Preeti or Traditional keyboard layout</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Typing;
