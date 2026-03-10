import { AlertBanner } from "@/components/alert-banner"
import { GitHubLink } from "@/components/github-link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <AlertBanner />
      <SiteHeader githubLink={<GitHubLink />} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  )
}
