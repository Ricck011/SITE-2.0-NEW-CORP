import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";

const badgeVariants = cva(
  "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "text-brand-accent-soft",
        secondary: "text-muted-foreground",
        color: "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props}>
    {variant === "secondary" ? (
      <BadgeCheck aria-hidden="true" className="w-4 h-4 fill-transparent stroke-muted-foreground" />
    ) : variant === "color" ? (
      <BadgeCheck aria-hidden="true" className="w-4 h-4 fill-brand-accent stroke-background" />
    ) : (
      <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 bg-brand-accent" />
    )}
    {children}
  </div>;
}

export { Badge, badgeVariants };
