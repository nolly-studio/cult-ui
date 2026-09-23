import { ArrowRight } from "lucide-react";

export function AlertBanner() {
  return (
    <div className="relative z-50 w-full bg-[#ADFA1B] text-black">
      <a
        href="https://aisdkagents.com"
        target="_blank"
        rel="noopener"
        className="group flex items-center justify-center gap-3 px-4 py-1.5 transition-colors hover:bg-[#9de610]"
      >
        <div className="hidden h-px w-8 bg-gradient-to-r from-transparent to-black/10 sm:block" />
        <div className="flex items-center gap-2">
          <span className="font-pixel-square border border-black/20 bg-black/5 px-1.5 py-0.5 text-[10px] tracking-wider text-black uppercase shadow-inner">
            New
          </span>
          <span className="font-pixel-square text-[11px] tracking-wider text-black/80 uppercase">
            AI SDK Agents
          </span>
          <span className="font-pixel-square hidden text-[11px] text-black/25 sm:inline">
            /
          </span>
          <span className="font-pixel-square hidden text-[11px] tracking-wider text-black/50 sm:inline">
            100+ AI agent patterns - just copy & paste
          </span>
        </div>
        <ArrowRight className="size-3 text-black/40 transition-transform group-hover:translate-x-0.5 group-hover:text-black" />
        <div className="hidden h-px w-8 bg-gradient-to-l from-transparent to-black/10 sm:block" />
      </a>
    </div>
  );
}
