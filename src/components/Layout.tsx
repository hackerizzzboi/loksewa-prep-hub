import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/mcq", label: "MCQ" },
  { path: "/subjective", label: "Subjective" },
  { path: "/syllabus", label: "Syllabus" },
  { path: "/typing", label: "Typing" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 glass-header">
        <nav className="max-w-[1080px] mx-auto px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-col">
            <span className="font-bold tracking-wider uppercase text-sm">
              LOKSEWA CO
            </span>
            <span className="text-xs text-muted-foreground">
              Dashboard • By Dhiaj Shahi
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="max-w-[1080px] mx-auto px-5 py-8">{children}</main>

      <footer className="max-w-[1080px] mx-auto px-5 pb-6 text-xs text-muted-foreground flex justify-between gap-4 flex-wrap border-t border-border/30 pt-4 mt-4">
        <span>Loksewa Computer Operator Prep Hub • Designed for personal use by Dhiaj Shahi.</span>
        <span className="text-destructive">Backup your notes and files regularly.</span>
      </footer>
    </div>
  );
};

export default Layout;
