import { ThemeProvider } from "@/components/providers";
import { DocsSidebar } from "@/components/docs-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DocsLayoutProps {
	children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<div className="container-wrapper flex flex-1 flex-col px-2">
				<SidebarProvider
					className="min-h-min flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)] 3xl:fixed:container 3xl:fixed:px-3"
					style={
						{
							"--sidebar-width": "calc(var(--spacing) * 72)",
							"--header-height": "calc(var(--spacing) * 24)",
						} as React.CSSProperties
					}
				>
					<DocsSidebar />
					<div className="h-full w-full">{children}</div>
				</SidebarProvider>
			</div>
		</ThemeProvider>
	);
}
