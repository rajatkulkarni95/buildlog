import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface ISliderProps {
  step: number;
  min: number;
  max: number;
  value: number[];
  label: string;
  handleChange: (value: number[]) => void;
}

const Slider = ({
  step,
  min,
  max,
  label,
  value,
  handleChange,
}: ISliderProps) => (
  <RadixSlider.Root
    className="flex items-center select-none relative touch-none h-5 w-48"
    value={value}
    max={max}
    min={min}
    step={step}
    aria-label={label}
    onValueChange={handleChange}
  >
    <RadixSlider.Track className="bg-zinc-300/70 dark:bg-zinc-700/60 relative grow rounded-full h-1">
      <RadixSlider.Range className="absolute bg-zinc-900 dark:bg-zinc-50 rounded-full h-full" />
    </RadixSlider.Track>
    <RadixSlider.Thumb className="block w-4 h-4 bg-zinc-900 dark:bg-zinc-50 shadow-sm rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none" />
    <span className="absolute top-6 left-1/2 -translate-x-1/2 text-zinc-900 dark:text-zinc-50 text-xs font-semibold">
      {value} secs
    </span>
  </RadixSlider.Root>
);

export default Slider;
