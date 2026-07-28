export default function SkeletonTable() {
    return (
      <section className="mt-8 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-full rounded bg-slate-800"></div>
  
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-12 rounded bg-slate-800"
            ></div>
          ))}
        </div>
      </section>
    );
  }