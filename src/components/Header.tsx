export default function Header() {
    return (
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Infrastructure Overview
          </h1>
          <p className="text-sm text-slate-400">
            Monitor servers, deployments, and system health.
          </p>
        </div>
  
        <div className="rounded-full bg-cyan-500 px-4 py-2 font-semibold text-slate-950">
          Raymond
        </div>
      </header>
    );
  }