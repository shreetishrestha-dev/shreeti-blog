export function FooterIsland() {
  return (
    <footer className="content-shell pb-10 pt-4">
      <div className="footer-island mx-auto max-w-2xl rounded-[2rem] px-6 py-5 text-center">
        <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[var(--muted)]">Shreeti Shrestha</p>
        <a
          href="https://shreetishrestha-dev.github.io/portfolio-site/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex text-sm leading-7 text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4 transition hover:text-[var(--accent)]"
        >
          Visit portfolio
        </a>
      </div>
    </footer>
  );
}
