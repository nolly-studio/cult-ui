import { AnnouncementBar } from "@/components/announcement-bar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <AnnouncementBar />
      {children}
    </>
  );
}
