import { NeumorphEyebrow } from "../ui/neumorph-eyebrow"

export default function NeumorphEyebrowDemo() {
  return (
    <div className="space-y-4 flex flex-col items-center justify-center w-full">
      <NeumorphEyebrow>A milestone in scraping</NeumorphEyebrow>
      <NeumorphEyebrow intent="primary">Primary variant</NeumorphEyebrow>
      <NeumorphEyebrow intent="secondary">Secondary variant</NeumorphEyebrow>
    </div>
  )
}
