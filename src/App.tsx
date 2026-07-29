import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CommandPalette from "./components/CommandPalette";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Deployments from "./pages/Deployments";
import Login from "./pages/Login";
import Network from "./pages/Network";
import Servers from "./pages/Servers";
import Settings from "./pages/Settings";

function AppLayout() {
  return (
    <>
      <CommandPalette />

      <div className="flex min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute permission="view-dashboard">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/servers"
              element={
                <ProtectedRoute permission="view-servers">
                  <Servers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/network"
              element={
                <ProtectedRoute permission="view-network">
                  <Network />
                </ProtectedRoute>
              }
            />

            <Route
              path="/deployments"
              element={
                <ProtectedRoute permission="view-deployments">
                  <Deployments />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute permission="view-settings">
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}