import { Check, Info, X, XCircle } from "lucide-react";
import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

const icons = { success: Check, error: XCircle, info: Info };
const styles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-950",
  error: "border-rose-200 bg-rose-50 text-rose-950",
  info: "border-sky-200 bg-sky-50 text-sky-950",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = "info") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 4200);
  }, []);
  const dismiss = (id) => setToasts((current) => current.filter((toast) => toast.id !== id));

  return <ToastContext.Provider value={{ showToast }}>
    {children}
    <div className="pointer-events-none fixed inset-x-4 bottom-5 z-10000 flex flex-col items-end gap-3 sm:left-auto sm:w-[min(24rem,calc(100vw-2rem))]" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || Info;
        return <div key={toast.id} className={`pointer-events-auto flex w-full items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-sm ${styles[toast.type] || styles.info}`}>
          <span className="mt-0.5 shrink-0"><Icon size={18} /></span>
          <p className="flex-1 text-sm font-medium leading-6">{toast.message}</p>
          <button type="button" onClick={() => dismiss(toast.id)} className="shrink-0 rounded-full p-1 transition hover:bg-black/10" aria-label="Dismiss notification"><X size={16} /></button>
        </div>;
      })}
    </div>
  </ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
