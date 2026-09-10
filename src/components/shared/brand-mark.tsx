import Image from "next/image";

interface BrandMarkProps {
  compact?: boolean;
  inverse?: boolean;
  className?: string;
}

export function BrandMark({
  compact = false,
  inverse = false,
  className = "",
}: BrandMarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="ExpoVia"
    >
      <Image
        src="/assets/brand/expovia-app-icon.svg"
        alt=""
        width={36}
        height={36}
        priority
      />
      {!compact && (
        <span
          className={`text-lg font-black tracking-tight ${
            inverse ? "text-white" : "text-[var(--expo-navy)]"
          }`}
        >
          Expo<span className={inverse ? "text-[#ffe67a]" : "text-[var(--expo-blue)]"}>Via</span>
        </span>
      )}
    </span>
  );
}
