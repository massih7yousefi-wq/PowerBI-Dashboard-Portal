interface BrandLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  subtitle?: string;
  className?: string;
}

export function BrandLogo({
  size = 'medium',
  showText = true,
  subtitle = 'Business Intelligence',
  className = '',
}: BrandLogoProps) {
  return (
    <div className={`brand-logo brand-logo-${size} ${className}`}>
      <div className="brand-logo-mark" aria-hidden="true">
        <svg
          viewBox="0 0 64 64"
          role="img"
          aria-label="HRDashboard"
        >
          <defs>
            <linearGradient
              id="hrLogoGradient"
              x1="8"
              y1="8"
              x2="56"
              y2="56"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#8b7cff" />
              <stop offset="50%" stopColor="#5f8dff" />
              <stop offset="100%" stopColor="#45d6ff" />
            </linearGradient>

            <linearGradient
              id="hrLogoGlow"
              x1="12"
              y1="12"
              x2="52"
              y2="52"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#8b7cff" />
            </linearGradient>
          </defs>

          <path
            d="M15 11v42"
            stroke="url(#hrLogoGradient)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M15 14h17c7 0 12 5 12 11s-5 11-12 11H15"
            fill="none"
            stroke="url(#hrLogoGlow)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M31 36l17 17"
            fill="none"
            stroke="url(#hrLogoGradient)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <circle
            cx="51"
            cy="12"
            r="4"
            fill="#c8c1ff"
          />
        </svg>
      </div>

      {showText && (
        <div className="brand-logo-copy">
          <strong>HRDashboard</strong>
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
}