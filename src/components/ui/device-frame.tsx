import { cn, fetchPriority } from "@/lib/utils";

interface DeviceFrameProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

// Moldura de celular simples (borda + sombra), sem vidro nem degradê.
const DeviceFrame = ({ src, alt, className, priority = false }: DeviceFrameProps) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-[300px] aspect-[390/844] rounded-[36px] border-4 border-border bg-card p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-background">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
          {...fetchPriority(priority ? "high" : undefined)}
        />
      </div>
    </div>
  );
};

export default DeviceFrame;
