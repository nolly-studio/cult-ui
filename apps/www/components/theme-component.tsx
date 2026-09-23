"use client";

import * as React from "react";

import { Index } from "@/__registry__";
import { Icons } from "@/components/icons";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";

interface ThemeComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  extractClassname?: boolean;
  extractedClassNames?: string;
  align?: "center" | "start" | "end";
}

export function ThemeComponent({ name, ...props }: ThemeComponentProps) {
  const [config] = useConfig();

  const Preview = React.useMemo(() => {
    const Component = Index[config.style][name]?.component;

    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component{" "}
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name, config.style]);

  return (
    <div className={cn("relative")} {...props}>
      <React.Suspense
        fallback={
          <div className="text-muted-foreground flex items-center text-sm">
            <Icons.spinner className="mr-2 size-4 animate-spin" />
            Loading...
          </div>
        }
      >
        {Preview}
      </React.Suspense>
    </div>
  );
}
