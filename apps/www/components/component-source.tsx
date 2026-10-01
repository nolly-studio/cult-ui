import fs from "node:fs/promises";
import path from "node:path";

import * as React from "react";

import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import { ComponentCode } from "@/components/component-code";
import { highlightCode } from "@/lib/highlight-code";
import { getRegistryItem } from "@/lib/registry";
import { cn } from "@/lib/utils";

// Collapsed blocks only show ~12 lines, so longer registry sources ship this
// many lines in the page and load the rest from `/code/[name]` on expand.
const COLLAPSED_PREVIEW_LINES = 24;

export async function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
}: React.ComponentProps<"div"> & {
  name?: string;
  src?: string;
  title?: string;
  language?: string;
  collapsible?: boolean;
}) {
  if (!name && !src) {
    return null;
  }

  let code: string | undefined;

  if (name) {
    const item = await getRegistryItem(name);
    code = item?.files?.[0]?.content;
  }

  if (src) {
    const file = await fs.readFile(path.join(process.cwd(), src), "utf-8");
    code = file;
  }

  if (!code) {
    return null;
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx";

  if (!collapsible) {
    const highlightedCode = await highlightCode(code, lang);
    return (
      <div className={cn("relative", className)}>
        <ComponentCode html={highlightedCode} language={lang} title={title} />
      </div>
    );
  }

  const lines = code.split("\n");
  const lazyName =
    name && !src && lang === "tsx" && lines.length > COLLAPSED_PREVIEW_LINES * 2
      ? name
      : undefined;
  const highlightedCode = await highlightCode(
    lazyName ? lines.slice(0, COLLAPSED_PREVIEW_LINES).join("\n") : code,
    lang
  );

  return (
    <CodeCollapsibleWrapper
      className={className}
      lazyName={lazyName}
      title={title}
    >
      <ComponentCode
        html={highlightedCode}
        name={lazyName}
        truncated={Boolean(lazyName)}
        language={lang}
        title={title}
      />
    </CodeCollapsibleWrapper>
  );
}
