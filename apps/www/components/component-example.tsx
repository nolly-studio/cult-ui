"use client";

import * as React from "react";

import { CopyButton, CopyWithClassNames } from "@/components/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ComponentExampleProps extends React.HTMLAttributes<HTMLDivElement> {
  extractClassname?: boolean;
  extractedClassNames?: string;
  align?: "center" | "start" | "end";
  src?: string;
}

export function ComponentExample({
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = "center",
  src: _,
  ...props
}: ComponentExampleProps) {
  const [Example, Code, ...Children] = React.Children.toArray(
    children
  ) as React.ReactElement[];

  const codeString = React.useMemo(() => {
    if (
      typeof (Code?.props as any)?.["data-rehype-pretty-code-fragment"] !==
      "undefined"
    ) {
      const [, Button] = React.Children.toArray(
        (Code?.props as any)?.children
      ) as React.ReactElement[];
      return (
        (Button?.props as any)?.value ||
        (Button?.props as any)?.__rawString__ ||
        null
      );
    }
  }, [Code]);

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none rounded-tl-lg border border-b-2 border-t-black/10 border-r-transparent border-b-transparent border-l-black/10 bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none dark:border-t-white/10 dark:border-l-white/10"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none rounded-tr-lg border border-b-2 border-t-black/10 border-r-black/10 border-b-transparent border-l-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:shadow-none dark:border-t-white/10 dark:border-r-white/10"
            >
              Code
            </TabsTrigger>
          </TabsList>
          {extractedClassNames ? (
            <CopyWithClassNames
              value={codeString}
              classNames={extractedClassNames}
              className="absolute top-20 right-4"
            />
          ) : (
            codeString && (
              <CopyButton
                value={codeString}
                className="absolute top-20 right-4"
              />
            )
          )}
        </div>
        <TabsContent value="preview" className="rounded-md border">
          <div
            className={cn("flex min-h-[350px] justify-center p-2 md:p-10", {
              "items-center": align === "center",
              "items-start": align === "start",
              "items-end": align === "end",
            })}
          >
            {Example}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code}
            </div>
            {Children?.length ? (
              <div className="rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
                {Children}
              </div>
            ) : null}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
