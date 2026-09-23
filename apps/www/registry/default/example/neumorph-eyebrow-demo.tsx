import { NeumorphEyebrow } from "../ui/neumorph-eyebrow";

export default function NeumorphEyebrowDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <NeumorphEyebrow>A milestone in scraping</NeumorphEyebrow>
      <NeumorphEyebrow intent="primary">Primary variant</NeumorphEyebrow>
      <NeumorphEyebrow intent="secondary">Secondary variant</NeumorphEyebrow>
    </div>
  );
}
