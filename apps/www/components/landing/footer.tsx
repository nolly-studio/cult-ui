import Link from "next/link"

import { siteConfig } from "@/config/site"
import { aisdkAgentsUrl } from "@/lib/aisdkagents"

import { Icons } from "../icons"
import { LocalTime } from "./local-time"

const columns = [
  {
    title: "Library",
    links: [
      { label: "Components", href: siteConfig.links.components },
      { label: "Installation", href: "/docs/installation" },
      { label: "Theming", href: "/docs/theming" },
      { label: "MCP server", href: "/docs/mcp-server" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "Products",
    links: [
      {
        label: "AI SDK Agents",
        href: aisdkAgentsUrl("/", { medium: "footer", content: "home" }),
      },
      {
        label: "AI blocks",
        href: aisdkAgentsUrl("/patterns", {
          medium: "footer",
          content: "patterns",
        }),
      },
      {
        label: "AI skills",
        href: aisdkAgentsUrl("/skills", {
          medium: "footer",
          content: "skills",
        }),
      },
      { label: "Cult Pro downloads", href: "https://pro.cult-ui.com" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: siteConfig.links.github },
      { label: "X / Twitter", href: siteConfig.links.twitter },
    ],
  },
]

const linkClass =
  "text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md text-sm transition-colors duration-150 outline-none focus-visible:ring-2"

export const Footer = () => (
  <footer className="border-border/80 border-t">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
      <div className="flex flex-col items-start gap-3">
        <Link
          href="/"
          className="focus-visible:ring-ring flex items-center gap-2 rounded-md outline-none focus-visible:ring-2"
        >
          <Icons.cultLogoBasic
            aria-hidden="true"
            className="fill-foreground size-6"
          />
          <span className="font-pixel-square text-lg font-bold">cult ui</span>
        </Link>
        <p className="text-muted-foreground max-w-xs text-sm text-pretty">
          Free, open-source components for shadcn/ui. MIT licensed.
        </p>
      </div>
      {columns.map((column) => (
        <nav key={column.title} aria-label={column.title}>
          <h2 className="text-muted-foreground mb-4 font-mono text-[10px] tracking-wider uppercase">
            {column.title}
          </h2>
          <ul className="flex flex-col gap-2.5">
            {column.links.map((link) => {
              const external = link.href.startsWith("http")
              return (
                <li key={link.label}>
                  {external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      ))}
    </div>
    <div className="border-border/80 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs">
        <span>© {new Date().getFullYear()} Nolly Studio</span>
        <span>
          Made by{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline-offset-4 transition-colors duration-150 hover:underline"
          >
            @nolansym
          </a>
          , shipped <LocalTime />
        </span>
      </div>
    </div>
  </footer>
)
