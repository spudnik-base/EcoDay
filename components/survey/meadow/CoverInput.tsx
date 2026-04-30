"use client";

import Field from "@/components/ui/Field";

type Props = {
  letter: string;
  value: string;
  onChange: (v: string) => void;
};

export default function CoverInput({ letter, value, onChange }: Props) {
  const filled = value !== "" && value != null;
  return (
    <div className="bg-paper border-[0.5px] border-rule px-3 py-2 flex items-center gap-2">
      <span className="font-serif text-[18px] text-ink2 w-4 text-center">
        {letter}
      </span>
      <Field
        value={value}
        onChange={onChange}
        placeholder="0%"
        step="4"
        min="0"
        max="100"
        filled={filled}
        filledTone="moss"
      />
    </div>
  );
}
