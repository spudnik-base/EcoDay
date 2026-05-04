"use client";

import { useState } from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function Disclosure({ label, children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-left group"
      >
        <span className="font-mono uppercase tracking-spec text-[10px] font-medium text-ink border-2 border-ink bg-paper px-2 py-1 group-hover:bg-paper2 transition-colors">
          {open ? "hide" : "show"}
        </span>
        <span className="font-mono uppercase tracking-spec text-[10px] font-medium text-ink2 group-hover:text-ink">
          {label}
        </span>
      </button>
      {open && <div className="mt-2.5">{children}</div>}
    </div>
  );
}
