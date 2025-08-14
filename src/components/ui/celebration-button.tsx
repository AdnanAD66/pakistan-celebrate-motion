import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const celebrationButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        pakistan: "bg-gradient-pakistan text-primary-foreground hover:shadow-glow-green hover:scale-105 border border-primary-glow",
        gold: "bg-gradient-gold text-accent-foreground hover:shadow-glow-gold hover:scale-105 border border-gold-bright",
        flag: "bg-gradient-flag text-foreground hover:shadow-pakistan hover:scale-105",
        celebration: "bg-gradient-celebration text-foreground hover:shadow-glow-green hover:scale-105 animate-sparkle",
        ghost: "hover:bg-primary/10 hover:text-primary border border-primary/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "pakistan",
      size: "default",
    },
  }
);

export interface CelebrationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof celebrationButtonVariants> {
  asChild?: boolean;
}

const CelebrationButton = React.forwardRef<HTMLButtonElement, CelebrationButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(celebrationButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CelebrationButton.displayName = "CelebrationButton";

export { CelebrationButton, celebrationButtonVariants };