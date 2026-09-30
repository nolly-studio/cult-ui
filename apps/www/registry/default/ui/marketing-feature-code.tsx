"use client"

import { useState } from "react"
import {
  Check,
  Copy,
  Globe,
  Lock,
  RefreshCw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type NetworkPolicyFeature = {
  icon: LucideIcon
  title: string
  description: string
}

const defaultFeatures: NetworkPolicyFeature[] = [
  {
    icon: ShieldCheck,
    title: "Dynamic policies:",
    description: "allow-all, deny-all, or user-defined rules",
  },
  {
    icon: Lock,
    title: "Credentials injected on egress:",
    description: "never enter sandbox scope",
  },
  {
    icon: Globe,
    title: "Domain-based allowlists",
    description: "with wildcard support",
  },
  {
    icon: RefreshCw,
    title: "Live policy updates",
    description: "without restarting processes",
  },
]

const networkPolicySnippet = `const sandbox = await Sandbox.create({
\tnetwork: {
\t\tpolicy: 'allow-all',
\t}
});

// Install dependencies with full network access
await sandbox.runCommand({ cmd: 'npm', args: ['install'] });

// Lock down network before running untrusted code
await sandbox.setNetworkPolicy({
\tpolicy: 'user-defined',
\tallowedDomains: ['api.openai.com', '*.vercel.app'],
\t// Credentials injected on egress - never in sandbox
\ttransformations: [{
\t\tdomain: 'api.openai.com',
\t\theaders: { Authorization: 'Bearer $OPENAI_API_KEY' },
\t}],
});`

function NetworkPolicy({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="network-policy"
      className={cn("w-full bg-background py-16 md:py-24", className)}
      {...props}
    />
  )
}

function NetworkPolicyContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="network-policy-container"
      className={cn("mx-auto max-w-[1080px] px-4 md:px-8", className)}
      {...props}
    />
  )
}

function NetworkPolicyHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="network-policy-header"
      className={cn("mb-16 text-center", className)}
      {...props}
    />
  )
}

function NetworkPolicyEyebrow({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="network-policy-eyebrow"
      className={cn(
        "mb-4 inline-flex items-center gap-2 text-muted-foreground text-sm",
        className
      )}
      {...props}
    />
  )
}

function NetworkPolicyTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="network-policy-title"
      className={cn(
        "mb-6 text-balance font-bold text-3xl text-foreground md:text-4xl",
        className
      )}
      {...props}
    />
  )
}

function NetworkPolicyDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="network-policy-description"
      className={cn(
        "mx-auto max-w-3xl text-balance text-muted-foreground leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function NetworkPolicyGrid({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="network-policy-grid"
      className={cn(
        "grid grid-cols-1 items-start gap-8 lg:grid-cols-[300px_1fr] lg:items-center lg:gap-12",
        className
      )}
      {...props}
    />
  )
}

function NetworkPolicyFeatures({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="network-policy-features"
      className={cn("space-y-8 lg:my-auto", className)}
      {...props}
    />
  )
}

function NetworkPolicyFeatureItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="network-policy-feature-item"
      className={cn("flex items-start gap-4", className)}
      {...props}
    />
  )
}

function NetworkPolicyFeatureIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="network-policy-feature-icon"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full bg-background text-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.08)] outline-4 outline-black/2",
        className
      )}
      {...props}
    />
  )
}

function NetworkPolicyFeatureText({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="network-policy-feature-text"
      className={cn("pt-2", className)}
      {...props}
    />
  )
}

function NetworkPolicyFeatureTitle({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="network-policy-feature-title"
      className={cn("font-medium text-foreground text-sm", className)}
      {...props}
    />
  )
}

function NetworkPolicyFeatureDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="network-policy-feature-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function NetworkPolicyCodeBlock({
  codeToCopy,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & { codeToCopy?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!codeToCopy) return

    try {
      await navigator.clipboard.writeText(codeToCopy)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      data-slot="network-policy-code-block"
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-secondary p-6 pr-16 font-mono text-sm",
        className
      )}
      {...props}
    >
      <button
        type="button"
        aria-label={copied ? "Copied code snippet" : "Copy code snippet"}
        onClick={handleCopy}
        className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-md border border-border bg-background/90 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
      >
        {copied ? (
          <Check className="size-4" strokeWidth={2} />
        ) : (
          <Copy className="size-4" strokeWidth={2} />
        )}
      </button>
      {children}
    </div>
  )
}

function NetworkPolicyCode({
  className,
  ...props
}: React.ComponentProps<"pre">) {
  return (
    <pre
      data-slot="network-policy-code"
      className={cn("leading-relaxed whitespace-pre-wrap", className)}
      style={{ tabSize: 2 }}
      {...props}
    />
  )
}

function NetworkPolicyCodeLine({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="network-policy-code-line"
      className={cn(
        "wrap-break-word whitespace-pre-wrap text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function NetworkPolicyKeyword({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="network-policy-keyword"
      className={cn("text-purple-600 dark:text-purple-400", className)}
      {...props}
    />
  )
}

function NetworkPolicyMethod({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="network-policy-method"
      className={cn("text-green-700 dark:text-green-500", className)}
      {...props}
    />
  )
}

function NetworkPolicyString({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="network-policy-string"
      className={cn("text-green-700 dark:text-green-500", className)}
      {...props}
    />
  )
}

function NetworkPolicyComment({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="network-policy-comment"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  )
}

function NetworkPolicySection({
  features = defaultFeatures,
}: {
  features?: NetworkPolicyFeature[]
}) {
  return (
    <NetworkPolicy>
      <NetworkPolicyContainer>
        <NetworkPolicyHeader>
          <NetworkPolicyEyebrow>
            <Lock className="size-4" />
            <span>Enterprise-grade security</span>
          </NetworkPolicyEyebrow>
          <NetworkPolicyTitle>
            Network Firewall with Credentials Brokering
          </NetworkPolicyTitle>
          <NetworkPolicyDescription>
            Control egress traffic with fine-grained network policies that can
            be updated at runtime. Credentials brokering injects secrets into
            outbound requests without exposing them inside the sandbox,
            preventing data exfiltration even when running untrusted code.
          </NetworkPolicyDescription>
        </NetworkPolicyHeader>

        <NetworkPolicyGrid>
          <NetworkPolicyFeatures>
            {features.map((feature) => (
              <NetworkPolicyFeatureItem
                key={`${feature.title}-${feature.description}`}
              >
                <NetworkPolicyFeatureIcon>
                  <feature.icon className="size-4" strokeWidth={1.5} />
                </NetworkPolicyFeatureIcon>
                <NetworkPolicyFeatureText>
                  <NetworkPolicyFeatureTitle>
                    {feature.title}
                  </NetworkPolicyFeatureTitle>{" "}
                  <NetworkPolicyFeatureDescription>
                    {feature.description}
                  </NetworkPolicyFeatureDescription>
                </NetworkPolicyFeatureText>
              </NetworkPolicyFeatureItem>
            ))}
          </NetworkPolicyFeatures>

          <NetworkPolicyCodeBlock codeToCopy={networkPolicySnippet}>
            <NetworkPolicyCode>
              <NetworkPolicyCodeLine>
                <NetworkPolicyKeyword>const</NetworkPolicyKeyword> sandbox ={" "}
                <NetworkPolicyKeyword>await</NetworkPolicyKeyword> Sandbox.
                <NetworkPolicyMethod>create</NetworkPolicyMethod>
                {"({"}
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                {"\t"}network: {"{"}
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                {"\t"}
                policy: <NetworkPolicyString>'allow-all'</NetworkPolicyString>,
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                {"\t"}
                {"}"},
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>{"});"}</NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine />
              <NetworkPolicyCodeLine>
                <NetworkPolicyComment>
                  {"// Install dependencies with full network access"}
                </NetworkPolicyComment>
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                <NetworkPolicyKeyword>await</NetworkPolicyKeyword> sandbox.
                <NetworkPolicyMethod>runCommand</NetworkPolicyMethod>
                {"({ cmd: "}
                <NetworkPolicyString>'npm'</NetworkPolicyString>, args: [
                <NetworkPolicyString>'install'</NetworkPolicyString>] {"});"}
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine />
              <NetworkPolicyCodeLine>
                <NetworkPolicyComment>
                  {"// Lock down network before running untrusted code"}
                </NetworkPolicyComment>
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                <NetworkPolicyKeyword>await</NetworkPolicyKeyword> sandbox.
                <NetworkPolicyMethod>setNetworkPolicy</NetworkPolicyMethod>
                {"({"}
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                {"\t"}
                policy:{" "}
                <NetworkPolicyString>'user-defined'</NetworkPolicyString>,
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                {"\t"}
                allowedDomains: [
                <NetworkPolicyString>
                  'api.openai.com'
                </NetworkPolicyString>,{" "}
                <NetworkPolicyString>'*.vercel.app'</NetworkPolicyString>],
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                {"\t"}
                <NetworkPolicyComment>
                  {"// Credentials injected on egress - never in sandbox"}
                </NetworkPolicyComment>
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                {"\t"}
                transformations: [{"{"}
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                {"\t\t"}
                domain:{" "}
                <NetworkPolicyString>'api.openai.com'</NetworkPolicyString>,
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                {"\t\t"}
                headers: {"{"} Authorization:{" "}
                <NetworkPolicyString>
                  'Bearer $OPENAI_API_KEY'
                </NetworkPolicyString>{" "}
                {"}"},
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>
                {"\t"}
                {"}],"}
              </NetworkPolicyCodeLine>
              <NetworkPolicyCodeLine>{"});"}</NetworkPolicyCodeLine>
            </NetworkPolicyCode>
          </NetworkPolicyCodeBlock>
        </NetworkPolicyGrid>
      </NetworkPolicyContainer>
    </NetworkPolicy>
  )
}

export {
  NetworkPolicySection,
  NetworkPolicy,
  NetworkPolicyContainer,
  NetworkPolicyHeader,
  NetworkPolicyEyebrow,
  NetworkPolicyTitle,
  NetworkPolicyDescription,
  NetworkPolicyGrid,
  NetworkPolicyFeatures,
  NetworkPolicyFeatureItem,
  NetworkPolicyFeatureIcon,
  NetworkPolicyFeatureText,
  NetworkPolicyFeatureTitle,
  NetworkPolicyFeatureDescription,
  NetworkPolicyCodeBlock,
  NetworkPolicyCode,
  NetworkPolicyCodeLine,
  NetworkPolicyKeyword,
  NetworkPolicyMethod,
  NetworkPolicyString,
  NetworkPolicyComment,
}
