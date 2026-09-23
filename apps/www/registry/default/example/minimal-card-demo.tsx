import {
  MinimalCard,
  MinimalCardDescription,
  MinimalCardImage,
  MinimalCardTitle,
} from "@/registry/default/ui/minimal-card";

export default function MinimalCardDemo() {
  const cards = [
    {
      title: "Sick title",
      description:
        "How to design with gestures and motion that feel intuitive and natural.",
    },
    {
      title: "Sick title",
      description:
        "How to design with gestures and motion that feel intuitive and natural.",
    },
    {
      title: "Sick title",
      description:
        "How to design with gestures and motion that feel intuitive and natural.",
    },
    {
      title: "Sick title",
      description:
        "How to design with gestures and motion that feel intuitive and natural.",
    },
    {
      title: "Sick title",
      description:
        "How to design with gestures and motion that feel intuitive and natural.",
    },
  ];
  return (
    <div className="w-full max-w-4xl">
      <div className="flex min-h-[500px] flex-col justify-center space-y-4 rounded-lg p-4">
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {cards.map((card) => (
            <MinimalCard>
              <MinimalCardImage src="/basic-img.png" alt={card.title} />
              <MinimalCardTitle>{card.title}</MinimalCardTitle>
              <MinimalCardDescription>
                {card.description}
              </MinimalCardDescription>
            </MinimalCard>
          ))}
        </div>
      </div>
    </div>
  );
}
