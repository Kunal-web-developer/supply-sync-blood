import { createFileRoute } from "@tanstack/react-router";
import { AskBloodBridge } from "@/components/ask-bloodbridge";
import { RequestBloodCard } from "@/components/request-blood";

export const Route = createFileRoute("/receiver")({
  head: () => ({
    meta: [
      { title: "Request blood – BloodBridge AI" },
      { name: "description", content: "Describe your blood need in English or Hinglish and get the top 3 verified matches nearby." },
      { property: "og:title", content: "Receiver portal – BloodBridge AI" },
      { property: "og:description", content: "Ask BloodBridge to find verified blood stock near you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Receiver,
});

function Receiver() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <div>
        <p className="eyebrow">Receiver portal</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">I need blood</h1>
        <p className="mt-2 text-muted-foreground">Type what you need in your own words. A person reviews every alert before it goes out.</p>
      </div>
      <div className="card-surface p-5 sm:p-6">
        <h2 className="mb-4 text-xl font-bold">Ask BloodBridge</h2>
        <AskBloodBridge />
      </div>
      <RequestBloodCard withAsk={false} />
    </div>
  );
}
