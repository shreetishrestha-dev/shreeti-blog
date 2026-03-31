export default function Loading() {
  return (
    <main className="content-shell pb-20 pt-20 md:pt-28">
      <article className="mx-auto max-w-3xl animate-pulse">
        <div className="section-label w-fit">Opening poem</div>
        <div className="mt-5 h-16 max-w-2xl rounded-[1.8rem] bg-[color:var(--button-surface)] md:h-24" />
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="h-5 w-36 rounded-full bg-[color:var(--button-surface)]" />
          <div className="h-5 w-28 rounded-full bg-[color:var(--button-surface)]" />
        </div>
        <div className="paper-panel mt-10 rounded-[2.4rem] p-8 md:p-12">
          <div className="space-y-5">
            <div className="h-5 w-[88%] rounded-full bg-[color:var(--button-surface)]" />
            <div className="h-5 w-[72%] rounded-full bg-[color:var(--button-surface)]" />
            <div className="h-5 w-[80%] rounded-full bg-[color:var(--button-surface)]" />
            <div className="h-5 w-[60%] rounded-full bg-[color:var(--button-surface)]" />
            <div className="h-8" />
            <div className="h-5 w-[84%] rounded-full bg-[color:var(--button-surface)]" />
            <div className="h-5 w-[67%] rounded-full bg-[color:var(--button-surface)]" />
            <div className="h-5 w-[78%] rounded-full bg-[color:var(--button-surface)]" />
          </div>
        </div>
      </article>
    </main>
  );
}
