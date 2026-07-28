export default function Settings() {
    return (
      <main className="theme-page flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="theme-text-primary text-3xl font-bold">
            Settings
          </h1>
  
          <p className="theme-text-muted mt-2">
            Manage environment preferences and notification behavior.
          </p>
  
          <form className="theme-surface theme-border mt-8 space-y-6 rounded-xl border p-6 shadow-lg">
            <label className="block">
              <span className="theme-text-primary text-sm font-medium">
                Default environment
              </span>
  
              <select className="theme-surface-muted theme-border theme-text-primary mt-2 w-full rounded-lg border px-4 py-3 outline-none transition focus:border-cyan-500">
                <option>Production</option>
                <option>Staging</option>
                <option>Development</option>
              </select>
            </label>
  
            <label className="theme-border flex items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <p className="theme-text-primary font-medium">
                  Critical alerts
                </p>
  
                <p className="theme-text-muted text-sm">
                  Notify me when a production service fails.
                </p>
              </div>
  
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 accent-cyan-500"
              />
            </label>
  
            <label className="theme-border flex items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <p className="theme-text-primary font-medium">
                  Deployment updates
                </p>
  
                <p className="theme-text-muted text-sm">
                  Notify me when deployment status changes.
                </p>
              </div>
  
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 accent-cyan-500"
              />
            </label>
  
            <button
              type="button"
              className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Save settings
            </button>
          </form>
        </div>
      </main>
    );
  }