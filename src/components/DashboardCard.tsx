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
      <article className="theme-surface theme-border rounded-xl border p-6 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
        <p className="theme-text-muted text-sm font-medium">
          {title}
        </p>
  
        <h3 className="theme-text-primary mt-2 text-3xl font-bold">
          {value}
        </h3>
  
        <p className="theme-text-secondary mt-2 text-sm">
          {description}
        </p>
      </article>
    );
  }