import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

const categories = ["All", "Definitions", "Procedures", "Diagrams", "Case Studies", "General Knowledge"];

const initialNotes: Note[] = [
  {
    id: 1,
    title: "What is an Operating System?",
    content: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs. Examples include Windows, Linux, macOS, and Android. The OS acts as an intermediary between users and the computer hardware.",
    category: "Definitions",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Steps to Create a Mail Merge",
    content: "1. Open MS Word and create or open a document\n2. Go to Mailings tab → Start Mail Merge → Select document type\n3. Click Select Recipients → Use Existing List or Type New List\n4. Insert merge fields using Insert Merge Field\n5. Preview results using Preview Results button\n6. Click Finish & Merge to complete the process",
    category: "Procedures",
    createdAt: new Date().toISOString(),
  },
];

const Subjective = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedNote, setExpandedNote] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", category: "Definitions" });

  const filteredNotes = selectedCategory === "All" 
    ? notes 
    : notes.filter(n => n.category === selectedCategory);

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }
    
    const note: Note = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      createdAt: new Date().toISOString(),
    };
    
    setNotes([note, ...notes]);
    setNewNote({ title: "", content: "", category: "Definitions" });
    setIsAdding(false);
    toast.success("Note added successfully!");
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
    toast.success("Note deleted");
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Subjective Notes</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Write and organize your short and long answers
            </p>
          </div>
          <Button onClick={() => setIsAdding(!isAdding)}>
            <Plus className="w-4 h-4 mr-1" /> Add Note
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`nav-link ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Add Note Form */}
        {isAdding && (
          <div className="hero-gradient rounded-2xl p-6 border border-[hsla(218,27%,59%,0.2)] mb-6 animate-slide-up">
            <h3 className="font-semibold mb-4">Add New Note</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Note title..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none"
              />
              <select
                value={newNote.category}
                onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:outline-none"
              >
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Textarea
                placeholder="Write your answer here..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="min-h-[150px] bg-secondary/50 border-border focus:border-primary"
              />
              <div className="flex gap-3">
                <Button onClick={handleAddNote}>
                  <Save className="w-4 h-4 mr-1" /> Save Note
                </Button>
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="space-y-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="feature-card cursor-pointer"
                onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge-primary">{note.category}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-semibold">{note.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {expandedNote === note.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
                {expandedNote === note.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="feature-card text-center py-12">
              <p className="text-muted-foreground">No notes found. Add your first note!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Subjective;
