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
    </nav>
  );
}
