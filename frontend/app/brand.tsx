export function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <svg
        className="brand-mark"
        width="25"
        height="32"
        viewBox="0 0 26 34"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 3H23V5C23 11 19 15 13 15S3 11 3 5V3ZM3 31H23V29C23 23 19 19 13 19S3 23 3 29V31Z"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
      <span>
        status<span className="brand-colon">:</span>pending
        <span className="brand-period">.</span>
      </span>
    </span>
  );
}
