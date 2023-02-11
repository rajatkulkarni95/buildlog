import React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";

interface IRadioGroupProps {
  label: string;
  value?: string;
  items: {
    value: string;
    label: string;
    renderer: React.ReactNode | string;
  }[];
  handleChange?: (value: string) => void;
}

const RadioGroup = ({
  label,
  items,
  value,
  handleChange,
}: IRadioGroupProps) => (
  <RadixRadioGroup.Root
    className="inline-flex rounded shadow-sm border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800"
    value={value}
    aria-label={label}
    onValueChange={handleChange}
  >
    {items.map((item) => {
      return (
        <RadixRadioGroup.Item
          className="flex bg-zinc-100 dark:bg-zinc-800 border-l border-r border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-sm justify-center items-center hover:bg-zinc-200 hover:dark:bg-zinc-700 first:border-none last:border-none first:rounded-l last:rounded-r data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50  data-[state=checked]:dark:bg-zinc-50 data-[state=checked]:dark:text-zinc-900"
          value={item.value}
          id={item.value}
          aria-label={item.label}
        >
          {item.renderer}
        </RadixRadioGroup.Item>
      );
    })}
  </RadixRadioGroup.Root>
);

export default RadioGroup;
