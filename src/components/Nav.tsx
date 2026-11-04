import Link from "next/link";

export function Nav({ onPhoto = false }: { onPhoto?: boolean }) {
  return (
    <nav
      className="container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 72,
        color: onPhoto ? "var(--on-photo)" : "var(--ink)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 24,
          textDecoration: "none",
        }}
      >
        Llama Inc.
      </Link>
      <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "center" }}>
        <a href="#how" className="small" style={{ textDecoration: "none" }}>
          How it works
        </a>
        <a href="#pricing" className="small" style={{ textDecoration: "none" }}>
          Premium
        </a>
      </div>
    </nav>
  );
}
