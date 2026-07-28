import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("raymond@cloudops.dev");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const state = location.state as LocationState | null;
  const destination = state?.from?.pathname ?? "/";

  if (isAuthenticated) {
    return <Navigate to={destination} replace />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const loginSucceeded = login(email, password);

    if (!loginSucceeded) {
      setError("Enter both an email address and password.");
      return;
    }

    navigate(destination, { replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Cloud Operations
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Sign in to CloudOps
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Access infrastructure, deployment, and network monitoring tools.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">
              Email address
            </span>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-200">
              Password
            </span>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
          <p className="font-medium text-slate-200">Demo access</p>
          <p className="mt-1">
            Any non-empty email and password will sign you in.
          </p>
        </div>
      </section>
    </main>
  );
}