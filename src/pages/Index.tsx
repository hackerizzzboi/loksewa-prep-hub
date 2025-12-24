import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { 
  ArrowRight, 
  FileQuestion, 
  FileText, 
  List, 
  Keyboard,
  Calendar,
  BookMarked,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react';

const featureCards = [
  {
    title: 'MCQ Practice',
    description: 'Topic-wise multiple choice questions covering all syllabus areas.',
    icon: FileQuestion,
    href: '/mcq',
    badge: 'Objective',
    accent: 'primary',
  },
  {
    title: 'Subjective Notes',
    description: 'Write and organize your notes for descriptive answers.',
    icon: FileText,
    href: '/subjective',
    badge: 'Paper II',
    accent: 'accent',
  },
  {
    title: 'Syllabus & Plan',
    description: 'Track your progress through the complete exam syllabus.',
    icon: List,
    href: '/syllabus',
    badge: 'Roadmap',
    accent: 'warning',
  },
  {
    title: 'Typing Practice',
    description: 'Improve your English and Nepali typing speed and accuracy.',
    icon: Keyboard,
    href: '/typing',
    badge: 'Practical',
    accent: 'success',
  },
];

const quickStats = [
  { label: 'MCQ Sessions', value: '0', target: '3/day', icon: Target },
  { label: 'Typing Minutes', value: '0', target: '60/day', icon: Keyboard },
  { label: 'Notes Written', value: '0', target: '2/day', icon: FileText },
];

export default function Index() {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';

  return (
    <Layout>
      {/* Hero Section */}
      <section className="glass-panel p-8 md:p-10 mb-8 animate-in relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative grid lg:grid-cols-[1.5fr_1fr] gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Welcome back, {userName}!</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Your <span className="gradient-text">Loksewa</span> Journey{' '}
              <br className="hidden md:block" />
              Starts Here
            </h1>
            
            <p className="mt-4 text-muted-foreground text-lg max-w-xl">
              Comprehensive preparation hub for Computer Operator Level 5 — 
              MCQs, notes, syllabus tracking, and typing practice all in one place.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" className="btn-glow gap-2" asChild>
                <Link to="/mcq">
                  Start MCQ Session
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/syllabus">View Syllabus</Link>
              </Button>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="glass-panel p-6 border-primary/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Today's Progress
              </h2>
            </div>
            
            <div className="space-y-3">
              {quickStats.map((stat) => (
                <div key={stat.label} className="stat-box flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <stat.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-lg">{stat.value}</span>
                    <span className="text-xs text-muted-foreground ml-1">/ {stat.target}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mb-8">
        <h2 className="section-title mb-6">Study Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureCards.map((card, i) => (
            <Link
              key={card.title}
              to={card.href}
              className={`card-interactive group animate-in stagger-${i + 1}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${card.accent}/10 border border-${card.accent}/20 flex items-center justify-center`}>
                  <card.icon className={`w-6 h-6 text-${card.accent}`} />
                </div>
                <span className="badge-glow">{card.badge}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="glass-panel p-6 animate-in stagger-3">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Daily Routine</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Morning: MCQ + Typing practice. Evening: GK and revision.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="tag-muted">5:00 AM - Study</span>
            <span className="tag-muted">College Hours</span>
            <span className="tag-muted">Evening Revision</span>
          </div>
        </div>

        <div className="glass-panel p-6 animate-in stagger-4">
          <div className="flex items-center gap-3 mb-3">
            <BookMarked className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Quick Resources</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Bookmark your PDFs, videos, and study materials here.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="tag-muted">Past Papers</span>
            <span className="tag-muted">Notes PDFs</span>
            <span className="tag-muted">Video Lectures</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
