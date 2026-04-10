"use client";

import { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <>
      <style>{`
        .todo-item {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 0.9rem 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          box-shadow: var(--shadow-sm);
          transition: border-color 0.15s, box-shadow 0.15s, opacity 0.2s;
          animation: todoIn 0.22s cubic-bezier(0.34,1.56,0.64,1);
        }

        @keyframes todoIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .todo-item:hover {
          border-color: var(--border-md);
          box-shadow: var(--shadow-md);
        }

        .todo-item.done {
          opacity: 0.5;
        }

        /* Checkbox */
        .todo-check {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 1.5px solid var(--border-md);
          background: var(--surface-2);
          cursor: pointer;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          margin-top: 1px;
        }

        .todo-check:hover {
          border-color: var(--accent);
          background: var(--accent-light);
        }

        .todo-check.checked {
          background: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 2px 6px var(--accent-glow);
        }

        /* Content */
        .todo-body {
          flex: 1;
          min-width: 0;
        }

        .todo-title {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.45;
          transition: color 0.15s;
        }

        .todo-item.done .todo-title {
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .todo-desc {
          margin-top: 0.2rem;
          font-size: 0.79rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .todo-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.45rem;
        }

        .todo-date {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.01em;
        }

        .todo-status-chip {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 1px 7px;
          border-radius: 999px;
          font-family: var(--font-display);
          letter-spacing: 0.02em;
        }

        .todo-status-chip.done-chip {
          background: var(--accent-light);
          color: var(--accent);
        }

        /* Delete */
        .todo-delete {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
          opacity: 0;
        }

        .todo-item:hover .todo-delete {
          opacity: 1;
        }

        .todo-delete:hover {
          background: var(--danger-dim);
          border-color: rgba(220,38,38,0.15);
          color: var(--danger);
        }
      `}</style>

      <div className={`todo-item${todo.completed ? " done" : ""}`}>
        {/* Checkbox */}
        <button
          className={`todo-check${todo.completed ? " checked" : ""}`}
          onClick={() => onToggle(todo)}
          aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
        >
          {todo.completed && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="todo-body">
          <p className="todo-title">{todo.title}</p>
          {todo.description && <p className="todo-desc">{todo.description}</p>}
          <div className="todo-meta">
            <span className="todo-date">{formatDate(todo.createdAt)}</span>
            {todo.completed && <span className="todo-status-chip done-chip">Done</span>}
          </div>
        </div>

        {/* Delete */}
        <button
          className="todo-delete"
          onClick={() => onDelete(todo._id)}
          aria-label="Delete task"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
        </button>
      </div>
    </>
  );
}