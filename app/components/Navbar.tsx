"use client";

import { Filter } from "./types";

interface NavbarProps {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  activeCount: number;
}

const TABS: Filter[] = ["All", "Active", "Completed"];

export default function Navbar({ filter, onFilterChange, activeCount }: NavbarProps) {
  return (
    <>
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(247,246,243,0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          height: 60px;
          display: flex;
          align-items: center;
          padding: 0 1.75rem;
          gap: 1.5rem;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-shrink: 0;
        }

        .nav-logo {
          width: 30px;
          height: 30px;
          background: var(--accent);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px var(--accent-glow);
        }

        .nav-brand-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: -0.03em;
          color: var(--text-primary);
        }

        .nav-brand-name em {
          font-style: normal;
          color: var(--accent);
        }

        .nav-tabs {
          display: flex;
          align-items: center;
          gap: 2px;
          background: var(--bg-alt);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 3px;
        }

        .nav-tab {
          padding: 0.3rem 0.85rem;
          border-radius: 7px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          border: none;
          background: transparent;
          font-family: var(--font-body);
          transition: all 0.15s ease;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }

        .nav-tab:hover {
          color: var(--text-secondary);
          background: rgba(0,0,0,0.04);
        }

        .nav-tab.active {
          background: var(--surface);
          color: var(--accent);
          font-weight: 600;
          box-shadow: var(--shadow-sm);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nav-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--accent-light);
          color: var(--accent);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 10px 3px 6px;
          border-radius: 999px;
          font-family: var(--font-display);
          letter-spacing: -0.01em;
        }

        .nav-badge-dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .nav-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #bbf7d0, #4ade80);
          border: 2px solid var(--surface);
          box-shadow: var(--shadow-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 800;
          color: #14532d;
          cursor: pointer;
          letter-spacing: -0.02em;
        }

        @media (max-width: 600px) {
          .navbar { padding: 0 1rem; }
          .nav-tabs { display: none; }
          .nav-brand-name { display: none; }
        }
      `}</style>

      <nav className="navbar">
        {/* Brand */}
        <div className="nav-brand">
          <div className="nav-logo">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="nav-brand-name">done<em>list</em></span>
        </div>

        {/* Filter tabs */}
        <div className="nav-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`nav-tab${filter === tab ? " active" : ""}`}
              onClick={() => onFilterChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="nav-right">
          {activeCount > 0 && (
            <span className="nav-badge">
              <span className="nav-badge-dot" />
              {activeCount} left
            </span>
          )}
          <div className="nav-avatar">RK</div>
        </div>
      </nav>
    </>
  );
}