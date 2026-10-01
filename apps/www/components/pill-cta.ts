import { cn } from "@/lib/utils";

const pillBase =
  "group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-base font-medium outline-none transition-[transform,background-color,box-shadow,color] duration-150 ease-out active:scale-[0.99] motion-reduce:active:scale-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Marketing pill CTAs. Kept separate from `buttonVariants` on purpose:
 * one `ink` or `accent` pill per band, siblings use `muted` or `outline`.
 */
export const pillCtaClass = {
  ink: cn(pillBase, "bg-foreground text-background hover:bg-foreground/90"),
  accent: cn(pillBase, "bg-primary text-primary-foreground hover:bg-primary/90"),
  outline: cn(
    pillBase,
    "bg-background text-foreground shadow-soft hover:bg-muted/80 hover:shadow-soft-md"
  ),
  muted: cn(
    pillBase,
    "bg-muted text-foreground hover:bg-muted/80 dark:bg-foreground/20 dark:hover:bg-foreground/40"
  ),
  /** Optical padding when the label is followed by an icon. */
  trailingIcon: "pl-6 pr-[1.375rem]",
  /** Header-sized pill. */
  compact: "h-9 px-4 text-sm",
};
