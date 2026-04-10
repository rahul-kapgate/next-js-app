"use client";

interface ToastProps {
  message: string;
  type: "success" | "error";
}

export default function Toast({ message, type }: ToastProps) {
  return (
    <>
      <style>{`
        .toast {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1.1rem;
          border-radius: var(--radius-sm);
          font-size: 0.84rem;
          font-weight: 500;
          font-family: var(--font-body);
          box-shadow: var(--shadow-lg);
          animation: toastIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
          max-width: 280px;
          border: 1px solid;
        }

        @keyframes toastIn {
          from { opacity: 0; transform: translateY(14px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .toast.success {
          background: #f0fdf4;
          border-color: #bbf7d0;
          color: #15803d;
        }

        .toast.error {
          background: #fef2f2;
          border-color: #fecaca;
          color: #dc2626;
        }

        .toast-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .toast.success .toast-icon { background: #dcfce7; }
        .toast.error   .toast-icon { background: #fee2e2; }
      `}</style>

      <div className={`toast ${type}`} role="alert">
        <div className="toast-icon">
          {type === "success" ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          )}
        </div>
        {message}
      </div>
    </>
  );
}