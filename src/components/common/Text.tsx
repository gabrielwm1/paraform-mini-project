import * as React from "react";
import { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("text-sm font-medium", {
  variants: {
    font: {
      sans: "font-sans",
      mono: "font-mono",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semiBold: "font-semibold",
      bold: "font-bold",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      ["2xl"]: "text-2xl",
      ["3xl"]: "text-3xl",
    },
    italic: {
      true: "italic",
    },
    underline: {
      true: "underline",
    },
    uppercase: {
      true: "uppercase",
    },
  },

  defaultVariants: {
    size: "base",
    font: "sans",
  },
});

export interface TypographyTypes
  extends Omit<HTMLAttributes<HTMLSpanElement>, "size" | "weight">,
    VariantProps<typeof typographyVariants> {
  font?: "sans" | "mono";
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  italic?: boolean;
  underline?: boolean;
  uppercase?: boolean;
  weight?: "light" | "normal" | "medium" | "semiBold" | "bold";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  children?: React.ReactNode;
}

export const Text = React.forwardRef<HTMLDivElement, TypographyTypes>(
  function Text(
    {
      as = "p",
      font,
      size,
      weight,
      className,
      italic,
      underline,
      uppercase,
      children,
      ...props
    },
    ref
  ) {
    const Component = as;
    return (
      <Component
        className={cn(
          typographyVariants({
            font,
            size,
            weight,
            className,
            italic,
            underline,
            uppercase,
          })
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
