export default function Card({ title, children, className = '' }) {
  return (
    <div className={`card p-5 sm:p-6 ${className}`}>
      {title && (
        <h2 className="text-base font-semibold text-ink mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
}
