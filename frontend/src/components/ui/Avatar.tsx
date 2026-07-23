interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export default function Avatar({ src, alt = "", fallback = "?", size = "md", className = "" }: AvatarProps) {
  const sizes = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
    "2xl": "w-32 h-32 text-3xl",
  };

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
    <div className={`${sizes[size]} rounded-full bg-accent-muted flex items-center justify-center text-accent font-semibold ${className}`}>
      {fallback.charAt(0).toUpperCase()}
    </div>
  );
}
