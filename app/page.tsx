"use client";

import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

type Filter = "All" | "Active" | "Completed";

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0f1117;
    --surface: #1a1d27;
    --surface-2: #20232f;
    --border: rgba(255,255,255,0.07);
    --border-hover: rgba(255,255,255,0.13);
    --accent: #6ee7b7;
    --accent-dim: rgba(110,231,183,0.1);
    --accent-glow: rgba(110,231,183,0.2);
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --text-muted: #475569;
    --danger: #f87171;
    --danger-dim: rgba(248,113,113,0.1);
    --success: #6ee7b7;
    --radius: 12px;
    --radius-sm: 8px;
  }

  html, body { height: 100%; }

  body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text-primary);
    min-height: 100vh;
  }

  /* ── Navbar ── */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(15,17,23,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbar-left { display: flex; align-items: center; gap: 0.75rem; }

  .logo-mark {
    width: 32px; height: 32px;
    background: var(--accent);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }

  .logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 1.1rem;
    letter-spacing: -0.02em;
  }
  .logo-text span { color: var(--accent); }

  .navbar-center {
    display: flex; align-items: center; gap: 3px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 4px;
  }

  .nav-tab {
    padding: 0.35rem 0.9rem;
    border-radius: 7px;
    font-size: 0.82rem; font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.15s ease;
    border: none; background: transparent;
    font-family: 'DM Sans', sans-serif;
  }
  .nav-tab:hover { color: var(--text-primary); background: rgba(255,255,255,0.04); }
  .nav-tab.active { background: var(--accent-dim); color: var(--accent); font-weight: 600; }

  .navbar-right { display: flex; align-items: center; gap: 0.75rem; }

  .badge {
    background: var(--accent-dim);
    color: var(--accent);
    font-size: 0.72rem; font-weight: 700;
    padding: 2px 9px; border-radius: 999px;
    font-family: 'Syne', sans-serif;
  }

  .divider-v { width: 1px; height: 20px; background: var(--border); }

  .avatar {
    width: 34px; height: 34px; border-radius: 50%;
    background: linear-gradient(135deg, #6ee7b7, #3b82f6);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.75rem; font-weight: 700; color: #fff;
    cursor: pointer; flex-shrink: 0;
  }

  /* ── Layout ── */
  .page {
    max-width: 680px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 4rem;
  }

  .page-header { margin-bottom: 2rem; }

  .page-title {
    font-family: 'Syne', sans-serif;
    font-size: 2rem; font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 0.4rem;
  }

  .page-title span { color: var(--accent); }

  .page-sub {
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  /* ── Add Form ── */
  .add-form {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
    margin-bottom: 1.75rem;
    transition: border-color 0.2s;
  }
  .add-form:focus-within { border-color: var(--accent-glow); }

  .form-row { display: flex; gap: 0.75rem; align-items: flex-start; }

  .input-group { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }

  .input-field {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.65rem 0.9rem;
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;
  }
  .input-field::placeholder { color: var(--text-muted); }
  .input-field:focus {
    border-color: rgba(110,231,183,0.4);
    box-shadow: 0 0 0 3px var(--accent-dim);
  }

  .input-field.title { font-weight: 500; }

  .input-field.desc { font-size: 0.83rem; resize: none; height: 58px; }

  .btn-submit {
    display: flex; align-items: center; gap: 0.4rem;
    background: var(--accent); color: #0f1117;
    border: none; padding: 0.65rem 1.1rem;
    border-radius: var(--radius-sm);
    font-size: 0.85rem; font-weight: 700;
    font-family: 'Syne', sans-serif;
    cursor: pointer; white-space: nowrap;
    transition: opacity 0.15s, transform 0.12s;
    align-self: flex-start;
    margin-top: 0;
    height: fit-content;
  }
  .btn-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
  .btn-submit:active { transform: translateY(0); }
  .btn-submit:disabled { opacity: 0.45; cursor: not-allowed; }

  .form-error {
    color: var(--danger);
    font-size: 0.8rem;
    margin-top: 0.4rem;
    display: flex; align-items: center; gap: 0.35rem;
  }

  /* ── Todo List ── */
  .list-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .list-label {
    font-family: 'Syne', sans-serif;
    font-size: 0.78rem; font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 0.08em;
  }

  .list-count {
    font-size: 0.78rem; color: var(--text-muted);
  }

  .todo-list { display: flex; flex-direction: column; gap: 0.6rem; }

  .todo-item {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1rem 1.1rem;
    display: flex; align-items: flex-start; gap: 0.85rem;
    transition: border-color 0.15s, background 0.15s;
    animation: slideIn 0.2s ease;
  }
  .todo-item:hover { border-color: var(--border-hover); }
  .todo-item.completed { opacity: 0.55; }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .todo-check {
    width: 20px; height: 20px; border-radius: 6px;
    border: 2px solid var(--border-hover);
    background: transparent;
    cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s ease;
    margin-top: 1px;
  }
  .todo-check:hover { border-color: var(--accent); }
  .todo-check.checked {
    background: var(--accent);
    border-color: var(--accent);
  }

  .todo-content { flex: 1; min-width: 0; }

  .todo-title {
    font-size: 0.9rem; font-weight: 500;
    color: var(--text-primary);
    line-height: 1.4;
  }
  .todo-item.completed .todo-title {
    text-decoration: line-through;
    color: var(--text-muted);
  }

  .todo-desc {
    font-size: 0.8rem; color: var(--text-muted);
    margin-top: 0.2rem;
    line-height: 1.5;
  }

  .todo-date {
    font-size: 0.72rem; color: var(--text-muted);
    margin-top: 0.4rem;
  }

  .todo-actions { display: flex; gap: 0.3rem; flex-shrink: 0; }

  .btn-icon-sm {
    width: 30px; height: 30px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 7px; border: 1px solid transparent;
    background: transparent; color: var(--text-muted);
    cursor: pointer; transition: all 0.15s;
  }
  .btn-icon-sm:hover { background: var(--surface-2); border-color: var(--border); color: var(--text-primary); }
  .btn-icon-sm.danger:hover { background: var(--danger-dim); border-color: rgba(248,113,113,0.2); color: var(--danger); }

  /* ── Empty State ── */
  .empty-state {
    text-align: center; padding: 3.5rem 1rem;
    color: var(--text-muted);
  }
  .empty-icon {
    width: 52px; height: 52px;
    margin: 0 auto 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
  }
  .empty-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem; font-weight: 700;
    color: var(--text-secondary);
    margin-bottom: 0.3rem;
  }
  .empty-sub { font-size: 0.85rem; }

  /* ── Skeleton ── */
  .skeleton {
    background: linear-gradient(90deg, var(--surface) 25%, var(--surface-2) 50%, var(--surface) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius);
    height: 72px;
  }
  @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

  /* ── Toast ── */
  .toast {
    position: fixed; bottom: 1.5rem; right: 1.5rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.75rem 1.1rem;
    font-size: 0.85rem;
    display: flex; align-items: center; gap: 0.5rem;
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    animation: toastIn 0.25s ease;
    z-index: 999;
    max-width: 300px;
  }
  .toast.success { border-color: rgba(110,231,183,0.25); color: var(--accent); }
  .toast.error { border-color: rgba(248,113,113,0.25); color: var(--danger); }

  @keyframes toastIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 640px) {
    .navbar-center { display: none; }
    .page { padding: 1.5rem 1rem 3rem; }
    .page-title { font-size: 1.6rem; }
    .form-row { flex-direction: column; }
    .btn-submit { width: 100%; justify-content: center; }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const TickIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("All");
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // ── Fetch todos ──
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const res = await fetch("/api/todo/todos");
      const data = await res.json();
      if (data.success) setTodos(data.data);
    } catch {
      showToast("Failed to load todos", "error");
    } finally {
      setLoading(false);
    }
  }

  // ── Add todo ──
  async function handleAdd() {
    setFormError("");
    if (!title.trim()) { setFormError("Title can't be empty"); return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/todo/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add");
      setTodos((prev) => [data.data, ...prev]);
      setTitle("");
      setDescription("");
      showToast("Task added!", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Toggle complete ──
  async function handleToggle(todo: Todo) {
    setTodos((prev) => prev.map((t) => t._id === todo._id ? { ...t, completed: !t.completed } : t));
    try {
      const res = await fetch(`/api/todo/todos/${todo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch {
      // Revert
      setTodos((prev) => prev.map((t) => t._id === todo._id ? { ...t, completed: todo.completed } : t));
      showToast("Failed to update task", "error");
    }
  }

  // ── Delete todo ──
  async function handleDelete(id: string) {
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      const res = await fetch(`/api/todo/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Task deleted", "success");
    } catch {
      fetchTodos(); // Refetch on failure
      showToast("Failed to delete task", "error");
    }
  }

  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // ── Filter ──
  const filtered = todos.filter((t) => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });
  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <>
      <style>{styles}</style>

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo-mark">
            <TickIcon />
          </div>
          <span className="logo-text">done<span>list</span></span>
        </div>

        <div className="navbar-center">
          {(["All", "Active", "Completed"] as Filter[]).map((tab) => (
            <button key={tab} className={`nav-tab ${filter === tab ? "active" : ""}`} onClick={() => setFilter(tab)}>
              {tab}
            </button>
          ))}
        </div>

        <div className="navbar-right">
          <span className="badge">{activeCount} left</span>
          <div className="divider-v" />
          <div className="avatar">AK</div>
        </div>
      </nav>

      {/* ── Page ── */}
      <main className="page">
        <div className="page-header">
          <h1 className="page-title">My <span>Tasks</span></h1>
          <p className="page-sub">{todos.length} tasks total · {activeCount} remaining</p>
        </div>

        {/* ── Add Form ── */}
        <div className="add-form">
          <div className="form-row">
            <div className="input-group">
              <input
                className="input-field title"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setFormError(""); }}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleAdd()}
              />
              <textarea
                className="input-field desc"
                placeholder="Add a note (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {formError && (
                <p className="form-error">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {formError}
                </p>
              )}
            </div>
            <button className="btn-submit" onClick={handleAdd} disabled={submitting}>
              <PlusIcon />
              {submitting ? "Adding…" : "Add Task"}
            </button>
          </div>
        </div>

        {/* ── List ── */}
        <div className="list-header">
          <span className="list-label">{filter} Tasks</span>
          <span className="list-count">{filtered.length} item{filtered.length !== 1 ? "s" : ""}</span>
        </div>

        {loading ? (
          <div className="todo-list">
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ opacity: 1 - i * 0.2 }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <p className="empty-title">{filter === "Completed" ? "Nothing completed yet" : "No tasks here"}</p>
            <p className="empty-sub">{filter === "All" ? "Add a task above to get started" : `No ${filter.toLowerCase()} tasks right now`}</p>
          </div>
        ) : (
          <div className="todo-list">
            {filtered.map((todo) => (
              <div key={todo._id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
                {/* Checkbox */}
                <button
                  className={`todo-check ${todo.completed ? "checked" : ""}`}
                  onClick={() => handleToggle(todo)}
                  aria-label="Toggle complete"
                >
                  {todo.completed && <CheckIcon />}
                </button>

                {/* Content */}
                <div className="todo-content">
                  <p className="todo-title">{todo.title}</p>
                  {todo.description && <p className="todo-desc">{todo.description}</p>}
                  <p className="todo-date">{formatDate(todo.createdAt)}</p>
                </div>

                {/* Actions */}
                <div className="todo-actions">
                  <button className="btn-icon-sm danger" onClick={() => handleDelete(todo._id)} aria-label="Delete task">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ── Toast ── */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success"
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          }
          {toast.msg}
        </div>
      )}
    </>
  );
}