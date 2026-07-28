type DashboardCardProps = {
    title: string;
    value: number;
    description: string;
  };
  
  export default function DashboardCard({
    title,
    value,
    description,
  }: DashboardCardProps) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>   
    );
  }