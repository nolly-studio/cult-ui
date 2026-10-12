import { GitHubLink } from "@/components/github-link";
import { SiteHeader } from "@/components/site-header";

interface SiteLayoutProps {
  children: React.ReactNode;
}

/**
 * Chrome for every page except home, which renders its own overlay header.
 * The split is a route group rather than a pathname check so the server HTML
 * never contains both headers.
 */
export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <SiteHeader githubLink={<GitHubLink />} />
      <main className="flex-1">{children}</main>
    </>
  );
}
