import Link from "next/link";

/**
 * Brand mark — a geometric "M" in a rounded square with the brand gradient.
 * Matches favicon.svg / og-image for a consistent identity.
 *
 * `withWordmark` renders "Mashrur" next to the mark (nav + footer).
 * The mark alone is used where space is tight (mobile nav, hero accent).
 */
export function Logo({
  withWordmark = false,
  size = 28,
  href,
}: {
  withWordmark?: boolean;
  size?: number;
  href?: string;
}) {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="#18181b" stroke="url(#logoGrad)" strokeWidth="1.5" />
      <path
        d="M 8 24 L 8 8 L 16 20 L 24 8 L 24 24"
        stroke="url(#logoGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  const content = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      {mark}
      {withWordmark && (
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "-0.02em",
            color: "#fafafa",
          }}
        >
          Mashrur
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label="Mashrur Rahman — home"
        style={{ textDecoration: "none", display: "inline-flex" }}
      >
        {content}
      </Link>
    );
  }

  return <span>{content}</span>;
}
