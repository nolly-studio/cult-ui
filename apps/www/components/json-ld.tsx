import { siteConfig } from "@/config/site"

type JsonLdData = Record<string, unknown> | Record<string, unknown>[]

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // Escape `<` so content can never close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`
export const WEBSITE_ID = `${siteConfig.url}/#website`
export const AUTHOR_ID = `${siteConfig.url}/#jordan-gilliam`

export const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Cult UI",
    url: siteConfig.url,
    logo: `${siteConfig.url}/android-chrome-512x512.png`,
    sameAs: [siteConfig.links.github, siteConfig.links.twitter],
    founder: { "@id": AUTHOR_ID },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: "Jordan Gilliam",
    url: siteConfig.links.twitter,
    image: `${siteConfig.url}/images/jordan-headshot.jpg`,
    sameAs: [siteConfig.links.twitter],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Cult UI",
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  },
]
