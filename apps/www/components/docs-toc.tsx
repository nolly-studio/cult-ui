"use client";

import { cn } from "@/lib/utils";

interface DocsTableOfContentsProps {
  toc: Array<{
    title: string;
    url: string;
    children?: Array<{
      title: string;
      url: string;
    }>;
  }>;
}

export function DocsTableOfContents({ toc }: DocsTableOfContentsProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">On this page</h4>
      <ul className="space-y-1">
        {toc.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className={cn(
                "text-muted-foreground hover:text-foreground block text-sm transition-colors"
              )}
            >
              {item.title}
            </a>
            {item.children && (
              <ul className="mt-1 ml-4 space-y-1">
                {item.children.map((child) => (
                  <li key={child.url}>
                    <a
                      href={child.url}
                      className={cn(
                        "text-muted-foreground hover:text-foreground block text-sm transition-colors"
                      )}
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
