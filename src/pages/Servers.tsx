import ServerTable from "../components/ServerTable";

export default function Servers() {
  return (
    <main className="flex-1 bg-slate-950 p-8">
      <h1 className="text-3xl font-bold text-white">Servers</h1>
      <ServerTable />
    </main>
  );
}