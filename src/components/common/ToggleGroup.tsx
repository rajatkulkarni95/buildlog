import React from "react";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";

interface IToggleGroupProps {
  label: string;
  value?: string;
  items: {
    value: string;
    label: string;
    renderer: React.ReactNode | string;
  }[];
  handleChange?: (value: string) => void;
}

const ToggleGroup = ({
  label,
  items,
  value,
  handleChange,
}: IToggleGroupProps) => (
  <RadixToggleGroup.Root
    className="inline-flex rounded shadow-sm border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800"
    type="single"
    value={value}
    aria-label={label}
    onValueChange={handleChange}
  >
    {items.map((item) => {
      return (
        <RadixToggleGroup.Item
          className="flex bg-zinc-100 dark:bg-zinc-800 border-l border-r border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm justify-center items-center hover:bg-zinc-200 hover:dark:bg-zinc-700 first:border-none last:border-none first:rounded-l last:rounded-r data-[state=on]:bg-zinc-900 data-[state=on]:text-zinc-50  data-[state=on]:dark:bg-zinc-50 data-[state=on]:dark:text-zinc-900"
          value={item.value}
          aria-label={item.label}
        >
          {item.renderer}
        </RadixToggleGroup.Item>
      );
    })}
  </RadixToggleGroup.Root>
);

export default ToggleGroup;
