import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,border-color,color,transform] duration-150 ease-out active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-[10px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-brand-accent-hover",
        gray: "bg-secondary text-foreground border border-border hover:bg-brand-surface-hover rounded-xl",
        secondary: "bg-secondary text-secondary-foreground hover:bg-brand-surface-hover rounded-xl",
        white: "bg-foreground text-background hover:bg-white",
        link: "text-muted-foreground bg-transparent hover:text-foreground underline-offset-4 hover:underline",
        outline: "bg-foreground/[0.035] text-foreground border border-border hover:bg-brand-surface-hover hover:border-input",
        "outline-accent": "border border-primary/70 text-primary bg-transparent font-mono uppercase tracking-[0.14em] text-xs hover:bg-primary hover:text-primary-foreground",
      },
      size: {
        default: "h-[46px] pl-4 pr-[14px] py-3",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        link: "h-auto w-auto p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
