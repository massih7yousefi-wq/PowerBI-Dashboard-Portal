interface StatCardProps {
  label: string;
  value: number;
  description?: string;
  icon: string;
  tone?: 'primary' | 'success' | 'warning' | 'danger';
}

export function StatCard({
  label,
  value,
  description,
  icon,
  tone = 'primary',
}: StatCardProps) {
  return (
    <div className={`stat-card stat-${tone}`}>
      <div className="stat-top">
        <span className="stat-icon">{icon}</span>
        <span className="stat-label">{label}</span>
      </div>

      <strong>{value}</strong>

      {description && (
        <span className="stat-description">{description}</span>
      )}
    </div>
  );
}