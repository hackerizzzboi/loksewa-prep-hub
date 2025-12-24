import { useState } from "react";
import Layout from "@/components/Layout";
import { CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react";

interface Topic {
  id: string;
  title: string;
  subtopics: string[];
  completed: boolean;
}

interface Section {
  id: string;
  title: string;
  badge: string;
  topics: Topic[];
}

const initialSyllabus: Section[] = [
  {
    id: "written",
    title: "Written Examination",
    badge: "Paper I & II",
    topics: [
      {
        id: "fundamentals",
        title: "Computer Fundamentals",
        subtopics: [
          "Introduction to Computers",
          "History and Generations of Computers",
          "Types of Computers",
          "Computer Hardware Components",
          "Input/Output Devices",
          "Memory Units (RAM, ROM, Cache)",
          "Storage Devices",
        ],
        completed: false,
      },
      {
        id: "os",
        title: "Operating Systems",
        subtopics: [
          "Introduction to Operating Systems",
          "Functions of OS",
          "Types of OS (Single user, Multi-user, Real-time)",
          "Windows Operating System",
          "Linux Basics",
          "File Management",
          "Process Management",
        ],
        completed: false,
      },
      {
        id: "msoffice",
        title: "MS Office Applications",
        subtopics: [
          "MS Word - Document Creation & Formatting",
          "MS Word - Tables, Mail Merge, Templates",
          "MS Excel - Spreadsheet Basics",
          "MS Excel - Formulas & Functions",
          "MS Excel - Charts & Data Analysis",
          "MS PowerPoint - Presentation Design",
          "MS Access - Database Basics",
        ],
        completed: false,
      },
      {
        id: "networking",
        title: "Computer Networks",
        subtopics: [
          "Introduction to Networks",
          "Types of Networks (LAN, WAN, MAN)",
          "Network Topologies",
          "OSI Model",
          "TCP/IP Protocol",
          "Internet and World Wide Web",
          "Network Security Basics",
        ],
        completed: false,
      },
      {
        id: "dbms",
        title: "Database Management",
        subtopics: [
          "Introduction to DBMS",
          "Types of Databases",
          "Relational Database Concepts",
          "SQL Basics (SELECT, INSERT, UPDATE, DELETE)",
          "Normalization",
          "ER Diagrams",
        ],
        completed: false,
      },
      {
        id: "web",
        title: "Web Technology",
        subtopics: [
          "HTML Basics",
          "CSS Fundamentals",
          "Introduction to JavaScript",
          "Web Browsers & Search Engines",
          "E-mail & E-commerce",
          "Web Security",
        ],
        completed: false,
      },
    ],
  },
  {
    id: "practical",
    title: "Practical Examination",
    badge: "Hands-on",
    topics: [
      {
        id: "typing",
        title: "Typing Test",
        subtopics: [
          "English Typing (40 WPM minimum)",
          "Nepali Typing (25 WPM minimum)",
          "Accuracy Requirements",
          "Touch Typing Techniques",
        ],
        completed: false,
      },
      {
        id: "office-practical",
        title: "Office Package Practical",
        subtopics: [
          "Document Preparation in MS Word",
          "Letter Writing & Formatting",
          "Spreadsheet Calculations",
          "Chart Creation",
          "Presentation Design",
          "Database Operations",
        ],
        completed: false,
      },
    ],
  },
  {
    id: "interview",
    title: "Interview Preparation",
    badge: "Viva",
    topics: [
      {
        id: "gk",
        title: "General Knowledge & Current Affairs",
        subtopics: [
          "Nepal's IT Policy",
          "E-Government Initiatives",
          "Current Technology Trends",
          "Public Administration Basics",
          "Government Structure",
        ],
        completed: false,
      },
      {
        id: "job-knowledge",
        title: "Job Related Knowledge",
        subtopics: [
          "Role of Computer Operator",
          "Office Procedures",
          "Data Entry Best Practices",
          "Record Keeping",
          "Official Correspondence",
        ],
        completed: false,
      },
    ],
  },
];

const Syllabus = () => {
  const [syllabus, setSyllabus] = useState<Section[]>(initialSyllabus);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleCompletion = (sectionId: string, topicId: string) => {
    setSyllabus((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              topics: section.topics.map((topic) =>
                topic.id === topicId
                  ? { ...topic, completed: !topic.completed }
                  : topic
              ),
            }
          : section
      )
    );
  };

  const getProgress = (section: Section) => {
    const completed = section.topics.filter((t) => t.completed).length;
    return Math.round((completed / section.topics.length) * 100);
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Syllabus & Study Plan</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Track your progress through the complete Loksewa Computer Operator syllabus
          </p>
        </div>

        <div className="space-y-6">
          {syllabus.map((section) => (
            <div key={section.id} className="hero-gradient rounded-2xl p-6 border border-[hsla(218,27%,59%,0.2)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <span className="badge-primary">{section.badge}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {getProgress(section)}% complete
                  </span>
                  <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${getProgress(section)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {section.topics.map((topic) => (
                  <div key={topic.id} className="stat-card">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleTopic(topic.id)}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompletion(section.id, topic.id);
                          }}
                          className="transition-colors"
                        >
                          {topic.completed ? (
                            <CheckCircle className="w-5 h-5 text-accent" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>
                        <span className={topic.completed ? "text-muted-foreground line-through" : ""}>
                          {topic.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {topic.subtopics.length} subtopics
                        </span>
                        {expandedTopics.includes(topic.id) ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {expandedTopics.includes(topic.id) && (
                      <div className="mt-3 ml-8 space-y-2 border-l-2 border-border pl-4">
                        {topic.subtopics.map((subtopic, index) => (
                          <div key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {subtopic}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Syllabus;
