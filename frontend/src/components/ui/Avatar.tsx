interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  variant?: 'default' | 'micrographics';
}

export default function Avatar({ 
  src, 
  alt = "", 
  fallback = "?", 
  size = "md", 
  className = "",
  variant = 'default'
}: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-[11px]",
    md: "w-10 h-10 text-xs",
    lg: "w-14 h-14 text-sm",
    xl: "w-20 h-20 text-lg",
    "2xl": "w-28 h-28 text-xl",
  };

  // Micrographics variant - minimal dot style
  if (variant === 'micrographics') {
    if (src) {
      return (
        <img
          src={src}
          alt={alt}
          className={`${sizes[size]} rounded-full object-cover ring-1 ring-black/5 ${className}`}
        />
      );
    }

    return (
      <div 
        className={`${sizes[size]} rounded-full flex items-center justify-center ${className}`}
        style={{ 
          background: 'var(--mg-bg-paper)',
          color: 'var(--mg-text-muted)',
          fontFamily: 'var(--mg-font-sans)',
          fontWeight: 400
        }}
      >
        {fallback.charAt(0).toUpperCase()}
      </div>
    );
  }

  // Default variant
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div 
      className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold ${className}`}
      style={{ 
        background: 'rgba(225, 46, 109, 0.15)',
        color: '#E12E6D'
      }}
    >
      {fallback.charAt(0).toUpperCase()}
    </div>
  );
}
