import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
import StatCard from "@/components/StatCard";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient rounded-2xl p-6 md:p-8 border border-[hsla(218,27%,59%,0.2)] shadow-[0_22px_60px_hsla(222,47%,11%,0.95)] mb-6 animate-fade-in">
        <div className="grid md:grid-cols-[2.1fr_1.4fr] gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Computer Operator Loksewa Prep Hub
            </h1>
            <p className="mt-3 text-muted-foreground max-w-lg">
              Central control panel for your MCQs, subjective notes, syllabus and typing – built as a personal workspace for Loksewa Computer Operator Level 5.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="pill-soft">Written • Practical • Interview</span>
              <span className="pill-soft">Objective + Subjective</span>
              <span className="pill-soft">English & Nepali Typing</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="hero" asChild>
                <Link to="/mcq">
                  Start MCQ Session <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" asChild>
                <Link to="/syllabus">Open Full Syllabus</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl p-4 bg-secondary/50 border border-primary/30">
            <h2 className="font-semibold">Snapshot • Today</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Use this panel to quickly see how your preparation is distributed.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-4">
              <StatCard label="MCQ sets done" value="0 / 3" />
              <StatCard label="Typing (minutes)" value="0 / 60" />
              <StatCard label="Subjective answers" value="0 / 2" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="animate-slide-up">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <FeatureCard
            title="MCQ Practice"
            badge="Objective"
            description="Topic-wise MCQs for fundamentals, OS, MS Office, DBMS, web, networking and GK/public management."
            tags={["Timed", "Previous sets", "Accuracy focus"]}
            href="/mcq"
          />
          <FeatureCard
            title="Subjective Notes"
            badge="Paper II"
            description="Structured space to write and revise short and long answers for job-based knowledge."
            tags={["Definitions", "Procedures", "Diagrams"]}
            href="/subjective"
          />
          <FeatureCard
            title="Syllabus & Plan"
            badge="Roadmap"
            description="Clear view of exam structure and topics so you can track completion and plan weekly targets."
            tags={["Written", "Practical", "Interview"]}
            href="/syllabus"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard
            title="Typing & Practical"
            badge="Hands-on"
            description="Log English and Nepali typing, office package tasks and practical simulations."
            tags={["EN + NP", "MS Office", "Realistic tasks"]}
            href="/typing"
          />
          <FeatureCard
            title="Daily Routine"
            badge="Template"
            description="Keep your fixed slots for college, tuition, MCQ, subjective and typing in one quick view."
            tags={["Morning: MCQ + typing", "Evening: GK / revision"]}
          />
          <FeatureCard
            title="Resources (Manual)"
            badge="Links"
            description="Attach your PDFs, apps and playlists by bookmarking them in the browser with this hub as home."
            tags={["Past sets", "Notes PDFs", "Videos"]}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
