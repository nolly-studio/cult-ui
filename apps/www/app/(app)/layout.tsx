import { GitHubLink } from "@/components/github-link";

import { SiteHeader } from "@/components/site-header";

interface AppLayoutProps {
	children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
	return (
		<>
			<SiteHeader githubLink={<GitHubLink />} />
			<main className="flex-1">{children}</main>
		</>
	);
}
