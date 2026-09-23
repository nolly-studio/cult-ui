"use client";

import * as React from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

import { BlockToolbar } from "@/components/block-toolbar";
import { Icons } from "@/components/icons";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useConfig } from "@/hooks/use-config";
import { useLiftMode } from "@/hooks/use-lift-mode";
import { cn } from "@/lib/utils";
import { Block } from "@/registry/schema";

export function BlockPreview({
  block,
}: {
  block: Block & { hasLiftMode: boolean };
}) {
  const [config] = useConfig();
  const { isLiftMode } = useLiftMode(block.name);
  const [isLoading, setIsLoading] = React.useState(true);
  const ref = React.useRef<ImperativePanelHandle>(null);

  if (config.style !== block.style) {
    return null;
  }

  return (
    <Tabs
      id={block.name}
      defaultValue="preview"
      className="relative grid w-full scroll-m-20 gap-4"
      style={
        {
          "--container-height": block.container?.height,
        } as React.CSSProperties
      }
    >
      <BlockToolbar block={block} resizablePanelRef={ref} />
      <TabsContent
        value="preview"
        className="after:bg-muted relative after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-lg"
      >
        <ResizablePanelGroup direction="horizontal" className="relative z-10">
          <ResizablePanel
            ref={ref}
            className={cn(
              "bg-background relative rounded-lg border",
              isLiftMode ? "border-border/50" : "border-border"
            )}
            defaultSize={100}
            minSize={30}
          >
            {isLoading ? (
              <div className="text-muted-foreground absolute inset-0 z-10 flex h-[--container-height] w-full items-center justify-center gap-2 text-sm">
                <Icons.spinner className="size-4 animate-spin" />
                Loading...
              </div>
            ) : null}
            <iframe
              src={`/blocks/${block.style}/${block.name}`}
              height={block.container?.height}
              className="chunk-mode bg-background relative z-20 w-full"
              onLoad={() => {
                setIsLoading(false);
              }}
            />
          </ResizablePanel>
          <ResizableHandle
            className={cn(
              "after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:-translate-x-px after:-translate-y-1/2 after:rounded-full after:transition-all after:hover:h-10 sm:block",
              isLiftMode && "invisible"
            )}
          />
          <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </TabsContent>
      <TabsContent value="code">
        <div
          data-rehype-pretty-code-fragment
          dangerouslySetInnerHTML={{ __html: block.highlightedCode }}
          className="w-full overflow-hidden rounded-md [&_pre]:my-0 [&_pre]:h-[--container-height] [&_pre]:overflow-auto [&_pre]:p-6 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:whitespace-break-spaces"
        />
      </TabsContent>
    </Tabs>
  );
}
