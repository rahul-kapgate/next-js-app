"use client";

import { useState, useEffect, useCallback } from "react";
import { Todo, Filter } from "@/app/components/types";
import Navbar from "@/app/components/Navbar";
import AddTodoForm from "@/app/components/AddTodoForm";
import TodoList from "@/app/components/TodoList";
import Toast from "@/app/components/Toast";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("All");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch("/api/todo/todos");
      const data = await res.json();
      if (data.success) setTodos(data.data);
      else throw new Error(data.error);
    } catch {
      showToast("Failed to load tasks", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  // ── Add ────────────────────────────────────────────────────────────────────
  async function handleAdd(title: string, description: string) {
    const res = await fetch("/api/todo/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add");
    setTodos((prev) => [data.data, ...prev]);
    showToast("Task added!", "success");
  }

  // ── Toggle ─────────────────────────────────────────────────────────────────
  async function handleToggle(todo: Todo) {
    // Optimistic
    setTodos((prev) =>
      prev.map((t) => t._id === todo._id ? { ...t, completed: !t.completed } : t)
    );
    try {
      const res = await fetch(`/api/todo/todos/${todo._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Revert
      setTodos((prev) =>
        prev.map((t) => t._id === todo._id ? { ...t, completed: todo.completed } : t)
      );
      showToast("Failed to update task", "error");
    }
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    // Optimistic
    setTodos((prev) => prev.filter((t) => t._id !== id));
    try {
      const res = await fetch(`/api/todo/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("Task deleted", "success");
    } catch {
      fetchTodos();
      showToast("Failed to delete task", "error");
    }
  }

  // ── Toast ──────────────────────────────────────────────────────────────────
  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <>
      <style>{`
        .page-shell {
          max-width: 640px;
          margin: 0 auto;
          padding: 2rem 1.25rem 5rem;
        }

        .page-head {
          margin-bottom: 1.75rem;
        }

        .page-title {
          font-family: var(--font-display);
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 0.3rem;
        }

        .page-title span {
          color: var(--accent);
        }

        .page-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 0.01em;
        }

        .page-sub strong {
          color: var(--text-secondary);
          font-weight: 600;
        }

        /* Progress bar */
        .progress-wrap {
          margin-top: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .progress-track {
          flex: 1;
          height: 4px;
          background: var(--bg-alt);
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), #4ade80);
          border-radius: 999px;
          transition: width 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }

        .progress-pct {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent);
          min-width: 32px;
          text-align: right;
          letter-spacing: -0.01em;
        }

        @media (max-width: 600px) {
          .page-shell { padding: 1.25rem 1rem 4rem; }
          .page-title { font-size: 1.5rem; }
        }
      `}</style>

      {/* Navbar */}
      <Navbar
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
      />

      {/* Page */}
      <main className="page-shell">
        {/* Header */}
        <div className="page-head">
          <h1 className="page-title">My <span>Tasks</span></h1>
          <p className="page-sub">
            <strong>{activeCount}</strong> remaining · {todos.length} total
          </p>

          {/* Completion progress */}
          {todos.length > 0 && (
            <div className="progress-wrap">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.round(((todos.length - activeCount) / todos.length) * 100)}%`,
                  }}
                />
              </div>
              <span className="progress-pct">
                {Math.round(((todos.length - activeCount) / todos.length) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Add form */}
        <AddTodoForm onAdd={handleAdd} />

        {/* List */}
        <TodoList
          todos={todos}
          filter={filter}
          loading={loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </main>

      {/* Toast */}
      {toast && <Toast message={toast.msg} type={toast.type} />}
    </>
  );
}