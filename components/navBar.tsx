"use client";

import React, { useState } from "react";

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #0f1117;
    --surface: #1a1d27;
    --border: rgba(255,255,255,0.07);
    --accent: #6ee7b7;
    --accent-dim: rgba(110,231,183,0.12);
    --text-primary: #f1f5f9;
    --text-muted: #64748b;
    --danger: #f87171;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--text-primary);
  }

  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(15, 17, 23, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo-mark {
    width: 32px;
    height: 32px;
    background: var(--accent);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .logo-mark svg {
    width: 18px;
    height: 18px;
    color: #0f1117;
    stroke: #0f1117;
  }

  .logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }

  .logo-text span {
    color: var(--accent);
  }

  .navbar-center {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 4px;
  }

  .nav-tab {
    padding: 0.35rem 0.85rem;
    border-radius: 7px;
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.18s ease;
    border: none;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
  }

  .nav-tab:hover {
    color: var(--text-primary);
    background: rgba(255,255,255,0.04);
  }

  .nav-tab.active {
    background: var(--accent-dim);
    color: var(--accent);
    font-weight: 600;
  }

  .navbar-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .badge {
    background: var(--accent-dim);
    color: var(--accent);
    font-size: 0.72rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 999px;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.02em;
  }

  .btn-add {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--accent);
    color: #0f1117;
    border: none;
    padding: 0.45rem 1rem;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    cursor: pointer;
    transition: opacity 0.15s ease, transform 0.12s ease;
    letter-spacing: 0.01em;
  }

  .btn-add:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  .btn-add:active {
    transform: translateY(0);
  }

  .btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .btn-icon:hover {
    color: var(--text-primary);
    border-color: rgba(255,255,255,0.14);
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6ee7b7, #3b82f6);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    flex-shrink: 0;
  }

  .divider {
    width: 1px;
    height: 20px;
    background: var(--border);
  }

  @media (max-width: 640px) {
    .navbar-center { display: none; }
    .badge { display: none; }
  }
`;

const tabs = ["All", "Active", "Completed"];

export default function NavBar() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <>
      <style>{navStyles}</style>
      <nav className="navbar">
        {/* Left: Logo */}
        <div className="navbar-left">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
          <span className="logo-text">done<span>list</span></span>
        </div>

        {/* Center: Filter Tabs */}
        <div className="navbar-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`nav-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="navbar-right">

          <div className="divider" />

          {/* Search */}
          <button className="btn-icon" title="Search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Add Task */}
          <button className="btn-add">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Task
          </button>

        </div>
      </nav>
    </>
  );
}