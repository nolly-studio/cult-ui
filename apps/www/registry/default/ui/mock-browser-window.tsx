import type React from "react";

import { cn } from "@/lib/utils";

interface SidebarItem {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string | number;
}

interface WindowControlsProps {
  variant?: "macos" | "windows" | "chrome" | "safari";
  headerStyle?: "minimal" | "full";
}

interface AddressBarProps {
  url?: string;
  secure?: boolean;
  variant?: "chrome" | "safari";
  className?: string;
}

interface SidebarContentProps {
  items?: SidebarItem[];
  variant?: "navigation" | "bookmarks" | "history" | "extensions";
  className?: string;
}

interface BrowserWindowProps {
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showSidebar?: boolean;
  sidebarPosition?: "left" | "right" | "top" | "bottom";
  headerStyle?: "minimal" | "full";
  variant?: "chrome" | "safari" | "generic";
  theme?: "light" | "dark" | "auto";
  url?: string;
  sidebarItems?: Array<{
    icon?: React.ReactNode;
    label: string;
    active?: boolean;
    badge?: string | number;
  }>;
}

function WindowControls({
  variant = "macos",
  headerStyle = "full",
}: WindowControlsProps) {
  const sizeClasses = "size-2";

  if (variant === "macos" || variant === "safari") {
    const dotColors =
      headerStyle === "minimal"
        ? {
            red: "bg-muted border  border-foreground/20",
            yellow: "bg-muted border border-foreground/20",
            green: "bg-muted border border-foreground/20",
          }
        : {
            red: "bg-red-500 hover:bg-red-600 border border-foreground/20",
            yellow:
              "bg-yellow-500 hover:bg-yellow-600 border border-foreground/20",
            green:
              "bg-green-500 hover:bg-green-600 border border-foreground/20 ",
          };

    return (
      <div className="flex gap-2">
        <div
          className={cn(
            sizeClasses,
            "rounded-full",
            dotColors.red,
            "group flex cursor-pointer items-center justify-center transition-colors"
          )}
        >
          {headerStyle !== "minimal" && (
            <div className="h-0.5 w-1.5 bg-red-900/60 opacity-0 transition-opacity group-hover:opacity-100"></div>
          )}
        </div>
        <div
          className={cn(
            sizeClasses,
            "rounded-full",
            dotColors.yellow,
            "group flex cursor-pointer items-center justify-center transition-colors"
          )}
        >
          {headerStyle !== "minimal" && (
            <div className="h-0.5 w-1.5 bg-yellow-900/60 opacity-0 transition-opacity group-hover:opacity-100"></div>
          )}
        </div>
        <div
          className={cn(
            sizeClasses,
            "rounded-full",
            dotColors.green,
            "group flex cursor-pointer items-center justify-center transition-colors"
          )}
        >
          {headerStyle !== "minimal" && (
            <div className="h-1 w-1 border border-green-900/60 opacity-0 transition-opacity group-hover:opacity-100"></div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "windows") {
    return (
      <div className="flex gap-1">
        <div className="bg-muted/50 hover:bg-muted flex h-4 w-6 cursor-pointer items-center justify-center transition-colors">
          <div className="bg-foreground/60 h-0.5 w-2"></div>
        </div>
        <div className="bg-muted/50 hover:bg-muted flex h-4 w-6 cursor-pointer items-center justify-center transition-colors">
          <div className="border-foreground/60 h-2 w-2 border"></div>
        </div>
        <div className="flex h-4 w-6 cursor-pointer items-center justify-center bg-red-500/80 transition-colors hover:bg-red-500">
          <div className="h-0.5 w-2 rotate-45 bg-white"></div>
          <div className="absolute h-0.5 w-2 -rotate-45 bg-white"></div>
        </div>
      </div>
    );
  }

  if (variant === "chrome") {
    return (
      <div className="flex gap-1.5">
        <div
          className={cn(
            sizeClasses,
            "cursor-pointer rounded-full bg-red-500 transition-colors hover:bg-red-600"
          )}
        ></div>
        <div
          className={cn(
            sizeClasses,
            "cursor-pointer rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
          )}
        ></div>
        <div
          className={cn(
            sizeClasses,
            "cursor-pointer rounded-full bg-green-500 transition-colors hover:bg-green-600"
          )}
        ></div>
      </div>
    );
  }

  return (
    <div className="flex gap-1.5">
      <div
        className={`${sizeClasses} border-foreground/20 bg-foreground/10 rounded-full border`}
      ></div>
      <div
        className={`${sizeClasses} border-foreground/20 bg-foreground/10 rounded-full border`}
      ></div>
      <div
        className={`${sizeClasses} border-foreground/20 bg-foreground/10 rounded-full border`}
      ></div>
    </div>
  );
}

function AddressBar({
  url = "https://example.com",
  secure = true,
  variant = "chrome",
  className = "",
}: AddressBarProps) {
  const variantStyles = {
    chrome:
      "bg-muted/30 rounded-full border border-foreground/5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)_inset] backdrop-blur-sm",
    safari:
      "bg-muted/20 rounded-lg border border-foreground/5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)_inset] backdrop-blur-sm",
  };

  const iconColors = {
    chrome: "text-muted-foreground/60",
    safari: "text-muted-foreground/60",
  };

  return (
    <div className={`flex flex-1 justify-center ${className}`}>
      <div
        className={`${variantStyles[variant]} text-muted-foreground/70 flex max-w-md min-w-[200px] items-center gap-2 px-4 py-2 text-xs transition-colors`}
      >
        {secure && (
          <div className={`h-3 w-3 ${iconColors[variant]}`}>
            <svg viewBox="0 0 12 12" fill="currentColor">
              <title>Secure</title>
              <path d="M6 1a2.5 2.5 0 0 1 2.5 2.5V5h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h.5V3.5A2.5 2.5 0 0 1 6 1z" />
            </svg>
          </div>
        )}
        <span className="truncate">{url}</span>
      </div>
    </div>
  );
}

function SidebarContent({
  items = [
    { label: "Dashboard", active: true },
    { label: "Analytics", badge: "3" },
    { label: "Settings" },
    { label: "Profile" },
  ],
  className = "",
}: SidebarContentProps) {
  return (
    <div className={`space-y-1 p-3 ${className}`}>
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className={`flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors ${
            item.active
              ? "bg-primary/5 text-primary border-primary/5 border"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
          } `}
        >
          {item.icon && (
            <div className="h-4 w-4 flex-shrink-0">{item.icon}</div>
          )}
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge && (
            <div className="bg-primary/5 text-primary min-w-[16px] rounded-full px-1.5 py-0.5 text-center text-xs">
              {item.badge}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function BrowserWindow({
  children,
  className = "",
  size = "md",
  showSidebar = false,
  sidebarPosition = "left",
  headerStyle = "minimal",
  variant = "generic",
  theme = "auto",
  url,
  sidebarItems,
}: BrowserWindowProps) {
  const sizeClasses = {
    sm: "h-64 max-w-sm",
    md: "h-80 max-w-2xl",
    lg: "h-96 max-w-4xl",
    xl: "h-[32rem] max-w-6xl",
  };

  const sidebarSizes = {
    sm: "w-32",
    md: "w-48",
    lg: "w-56",
    xl: "w-64",
  };

  const themeClasses =
    theme === "dark"
      ? "bg-background border-border"
      : theme === "light"
        ? "bg-background border-border"
        : "bg-background border-border";

  const getHeaderStyles = () => {
    const baseStyles =
      "h-11 border-b border-foreground/5 flex items-center px-4";

    if (variant === "chrome") {
      return `${baseStyles} bg-muted/10 overflow-hidden`;
    }

    if (variant === "safari") {
      return `${baseStyles} bg-muted/10 overflow-hidden border-b border-border/30`;
    }

    return `${baseStyles} bg-muted/20`;
  };

  return (
    <div
      className={`relative rounded-2xl border mask-b-from-50% shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.05),_0px_1px_1px_0px_rgba(255,_252,_240,_0.5)_inset,_0px_0px_0px_1px_hsla(0,_0%,_100%,_0.1)_inset,_0px_0px_1px_0px_rgba(28,_27,_26,_0.5)] dark:shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.2),_0px_1px_1px_0px_rgba(0,_0,_0,_0.3)_inset,_0px_0px_0px_1px_hsla(0,_0%,_0%,_0.2)_inset,_0px_0px_1px_0px_rgba(255,_255,_255,_0.1)] ${sizeClasses[size]} ${themeClasses} ${className} flex flex-col`}
    >
      <div className={getHeaderStyles()}>
        <WindowControls
          variant={variant === "generic" ? "macos" : variant}
          headerStyle={headerStyle}
        />

        {headerStyle === "full" && (
          <AddressBar
            url={url}
            variant={variant === "generic" ? "chrome" : variant}
            className="ml-4"
          />
        )}
      </div>

      {showSidebar && sidebarPosition === "top" && (
        <div className="border-foreground/5 bg-muted/20 h-16 border-b">
          <SidebarContent
            items={sidebarItems}
            variant="navigation"
            className="flex-row"
          />
        </div>
      )}

      <div className="flex h-0 flex-1">
        {/* Left Sidebar */}
        {showSidebar && sidebarPosition === "left" && (
          <div
            className={`border-foreground/5 bg-muted/20 border-r ${sidebarSizes[size]} h-full flex-shrink-0`}
          >
            <SidebarContent items={sidebarItems} />
          </div>
        )}

        {/* Main Content Area */}
        <div className="relative h-full min-w-0 flex-1">
          {children || <div className="absolute inset-0">{children}</div>}
        </div>

        {/* Right Sidebar */}
        {showSidebar && sidebarPosition === "right" && (
          <div
            className={`border-foreground/5 bg-muted/20 border-l ${sidebarSizes[size]} h-full flex-shrink-0`}
          >
            <SidebarContent items={sidebarItems} />
          </div>
        )}
      </div>

      {/* Bottom Sidebar */}
      {showSidebar && sidebarPosition === "bottom" && (
        <div className="border-foreground/5 bg-muted/20 h-16 border-t">
          <SidebarContent
            items={sidebarItems}
            variant="navigation"
            className="flex-row"
          />
        </div>
      )}
    </div>
  );
}
