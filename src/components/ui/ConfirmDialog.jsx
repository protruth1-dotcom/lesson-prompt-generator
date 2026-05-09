import { useEffect, useRef } from 'react';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      cancelRef.current?.focus();
      const handler = (e) => {
        if (e.key === 'Escape') onCancel();
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" onClick={onCancel}>
      <div className="dialog-panel">
        <h3 id="confirm-dialog-title" className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-destructive"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
