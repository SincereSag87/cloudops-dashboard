export default function Settings() {
    return (
      <main className="flex-1 bg-slate-950 p-6 md:p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-white">
            Settings
          </h1>
  
          <p className="mt-2 text-slate-400">
            Manage environment preferences and notification behavior.
          </p>
  
          <form className="mt-8 space-y-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
            <label className="block">
              <span className="text-sm font-medium text-slate-200">
                Default environment
              </span>
  
              <select className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 outline-none focus:border-cyan-500">
                <option>Production</option>
                <option>Staging</option>
                <option>Development</option>
              </select>
            </label>
  
            <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 p-4">
              <div>
                <p className="font-medium text-white">
                  Critical alerts
                </p>
  
                <p className="text-sm text-slate-500">
                  Notify me when a production service fails.
                </p>
              </div>
  
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5"
              />
            </label>
  
            <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-800 p-4">
              <div>
                <p className="font-medium text-white">
                  Deployment updates
                </p>
  
                <p className="text-sm text-slate-500">
                  Notify me when deployment status changes.
                </p>
              </div>
  
              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5"
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