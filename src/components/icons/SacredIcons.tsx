export const LotusIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="currentColor"
  >
    <path d="M50 10c0 20-15 35-15 50s15 25 15 25 15-10 15-25S50 10 50 10z" opacity="0.9"/>
    <path d="M50 20c-15 15-35 20-35 35s20 25 35 25c15 0 35-10 35-25s-20-20-35-35z" opacity="0.7"/>
    <path d="M50 30c-20 10-40 15-40 30s20 20 40 20 40-5 40-20-20-20-40-30z" opacity="0.5"/>
    <ellipse cx="50" cy="70" rx="8" ry="5" opacity="1"/>
  </svg>
);

export const MandalaIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="0.5"
  >
    <circle cx="50" cy="50" r="45"/>
    <circle cx="50" cy="50" r="35"/>
    <circle cx="50" cy="50" r="25"/>
    <circle cx="50" cy="50" r="15"/>
    <circle cx="50" cy="50" r="5"/>
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <line 
        key={i}
        x1="50" 
        y1="5" 
        x2="50" 
        y2="95" 
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <path 
        key={i}
        d="M50 20 Q60 35 50 50 Q40 35 50 20"
        transform={`rotate(${angle} 50 50)`}
        fill="currentColor"
        opacity="0.1"
      />
    ))}
  </svg>
);

export const LeafIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.16 20C12.72 20 17 15.72 17 11V8M8.16 18C7.83 18 7.5 17.97 7.18 17.91L9.17 12.81C9.66 12.93 10.13 13 10.59 13C12.75 13 14.69 11.67 15.72 9.67C14.22 11.31 11.61 12.3 9.59 12.3C9.23 12.3 8.88 12.27 8.53 12.22L10.4 7.25C8.5 7.76 6.66 8.93 5.34 10.66C5.12 11.28 5 11.94 5 12.62C5 13.87 5.41 15.02 6.11 15.95L5.31 17.9C7.05 19.22 9.37 19.86 11.62 19.86L12.67 17.21C11.1 17.68 9.49 17.97 8.16 18Z"/>
  </svg>
);

export const SunIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
  >
    <path d="M12 7C9.24 7 7 9.24 7 12S9.24 17 12 17 17 14.76 17 12 14.76 7 12 7M12 15C10.34 15 9 13.66 9 12S10.34 9 12 9 15 10.34 15 12 13.66 15 12 15M12 2L14.39 5.42C13.65 5.15 12.84 5 12 5S10.35 5.15 9.61 5.42L12 2M3.34 7L7.5 6.65C6.9 7.16 6.36 7.78 5.94 8.5C5.5 9.24 5.25 10 5.11 10.79L3.34 7M3.36 17L5.12 13.23C5.26 14 5.53 14.78 5.95 15.5C6.37 16.24 6.91 16.86 7.5 17.37L3.36 17M20.65 7L18.88 10.79C18.74 10 18.47 9.23 18.05 8.5C17.63 7.78 17.1 7.15 16.5 6.64L20.65 7M20.64 17L16.5 17.36C17.09 16.85 17.62 16.23 18.04 15.5C18.46 14.77 18.73 14 18.87 13.21L20.64 17M12 22L9.59 18.56C10.33 18.83 11.14 19 12 19C12.82 19 13.63 18.83 14.37 18.56L12 22Z"/>
  </svg>
);

export const OmIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="currentColor"
  >
    <text 
      x="50" 
      y="70" 
      fontSize="60" 
      textAnchor="middle" 
      fontFamily="serif"
    >
      ॐ
    </text>
  </svg>
);

export const WavePattern = ({ className = "w-full h-24" }: { className?: string }) => (
  <svg 
    viewBox="0 0 1440 120" 
    className={className}
    preserveAspectRatio="none"
    fill="currentColor"
  >
    <path d="M0,40 C320,100 420,20 720,40 C1020,60 1120,100 1440,40 L1440,120 L0,120 Z" opacity="0.1"/>
    <path d="M0,60 C360,120 480,40 720,60 C960,80 1080,120 1440,60 L1440,120 L0,120 Z" opacity="0.15"/>
    <path d="M0,80 C400,20 560,100 720,80 C880,60 1040,20 1440,80 L1440,120 L0,120 Z" opacity="0.2"/>
  </svg>
);
