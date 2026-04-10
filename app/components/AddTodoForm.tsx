"use client";

import { useState } from "react";

interface AddTodoFormProps {
  onAdd: (title: string, description: string) => Promise<void>;
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);

  async function handleSubmit() {
    setError("");
    if (!title.trim()) { setError("Task title is required"); return; }

    setSubmitting(true);
    try {
      await onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
      setExpanded(false);
    } catch (err: any) {
      setError(err.message || "Failed to add task");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        .add-form {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          transition: box-shadow 0.2s, border-color 0.2s;
          margin-bottom: 1.5rem;
        }

        .add-form:focus-within {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px var(--accent-dim), var(--shadow-sm);
        }

        .add-form-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
        }

        .add-icon {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          background: var(--accent-light);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s;
        }

        .add-form:focus-within .add-icon {
          background: var(--accent);
          color: white;
        }

        .add-title-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-body);
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-primary);
          caret-color: var(--accent);
        }

        .add-title-input::placeholder {
          color: var(--text-muted);
          font-weight: 400;
        }

        .add-expand-btn {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          border: 1px solid var(--border);
          background: var(--surface-2);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }

        .add-expand-btn:hover {
          border-color: var(--border-md);
          color: var(--text-secondary);
        }

        .add-expand-btn.open {
          background: var(--accent-light);
          border-color: transparent;
          color: var(--accent);
          transform: rotate(180deg);
        }

        .add-form-footer {
          border-top: 1px solid var(--border);
          padding: 0.75rem 1rem;
          display: flex;
          gap: 0.5rem;
          align-items: flex-end;
          animation: expandDown 0.18s ease;
        }

        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .desc-input {
          flex: 1;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0.55rem 0.8rem;
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--text-secondary);
          outline: none;
          resize: none;
          height: 54px;
          transition: border-color 0.15s;
          caret-color: var(--accent);
        }

        .desc-input::placeholder { color: var(--text-muted); }
        .desc-input:focus { border-color: var(--border-focus); }

        .btn-add {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--accent);
          color: var(--text-on-accent);
          border: none;
          padding: 0.55rem 1rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-display);
          font-size: 0.83rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          letter-spacing: -0.01em;
          transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
          box-shadow: 0 2px 8px var(--accent-glow);
          align-self: flex-end;
          height: fit-content;
        }

        .btn-add:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px var(--accent-glow);
        }

        .btn-add:active { transform: translateY(0); }
        .btn-add:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }

        .form-error {
          padding: 0 1rem 0.65rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: var(--danger);
          animation: expandDown 0.15s ease;
        }
      `}</style>

      <div className="add-form">
        <div className="add-form-main">
          <div className="add-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>

          <input
            className="add-title-input"
            placeholder="Add a new task…"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(""); }}
            onFocus={() => setExpanded(true)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
          />

          <button
            className={`add-expand-btn${expanded ? " open" : ""}`}
            onClick={() => setExpanded((v) => !v)}
            title="Add note"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>

        {expanded && (
          <div className="add-form-footer">
            <textarea
              className="desc-input"
              placeholder="Add a note (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="btn-add" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Saving…" : "Add Task"}
            </button>
          </div>
        )}

        {error && (
          <p className="form-error">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </p>
        )}
      </div>
    </>
  );
}