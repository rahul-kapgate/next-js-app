"use client";

import { Todo, Filter } from "./types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  loading: boolean;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

function Skeleton() {
  return (
    <div style={{
      height: 72,
      borderRadius: 14,
      background: "linear-gradient(90deg, #f0efeb 25%, #e8e7e2 50%, #f0efeb 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.6s infinite",
    }} />
  );
}

function EmptyState({ filter }: { filter: Filter }) {
  const messages: Record<Filter, { icon: string; title: string; sub: string }> = {
    All: {
      icon: "📋",
      title: "No tasks yet",
      sub: "Add your first task above to get started",
    },
    Active: {
      icon: "🎉",
      title: "All caught up!",
      sub: "No active tasks — enjoy the moment",
    },
    Completed: {
      icon: "⏳",
      title: "Nothing completed yet",
      sub: "Complete a task and it will appear here",
    },
  };
  const { icon, title, sub } = messages[filter];

  return (
    <div style={{
      textAlign: "center",
      padding: "3rem 1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem",
    }}>
      <span style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{icon}</span>
      <p style={{
        fontFamily: "var(--font-display)",
        fontSize: "1rem",
        fontWeight: 700,
        color: "var(--text-secondary)",
        letterSpacing: "-0.02em",
      }}>{title}</p>
      <p style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>{sub}</p>
    </div>
  );
}

export default function TodoList({ todos, filter, loading, onToggle, onDelete }: TodoListProps) {
  const filtered = todos.filter((t) => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.65rem;
        }

        .list-label {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .list-count {
          font-size: 0.72rem;
          color: var(--text-muted);
          background: var(--surface-2);
          border: 1px solid var(--border);
          padding: 1px 8px;
          border-radius: 999px;
          font-family: var(--font-display);
          font-weight: 600;
        }

        .todo-stack {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      `}</style>

      <div>
        <div className="list-header">
          <span className="list-label">{filter} Tasks</span>
          <span className="list-count">{loading ? "…" : filtered.length}</span>
        </div>

        <div className="todo-stack">
          {loading ? (
            [0, 1, 2].map((i) => (
              <div key={i} style={{ opacity: 1 - i * 0.25 }}>
                <Skeleton />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            filtered.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}