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
        className="font-mono uppercase tracking-spec text-[10px] font-medium text-ink2 border border-rule px-2 py-1 hover:border-ink"
      >
        {open ? "hide working" : `show ${label}`}
      </button>
      {open && <div className="mt-2.5">{children}</div>}
    </div>
  );
}
