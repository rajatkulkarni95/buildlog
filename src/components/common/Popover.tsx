import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";

type TProps = {
  triggerLabel: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  panelWidth?: string;
  defaultPadding?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  title?: string;
};

const Popover = ({
  triggerLabel,
  icon,
  children,
  panelWidth,
  title,
  side = "bottom",
}: TProps) => (
  <RadixPopover.Root>
    <RadixPopover.Trigger className={`relative m-0 p-0 !outline-none`}>
      <button
        className="ml-2 p-2 group rounded outline-none hover:bg-zinc-200 hover:dark:bg-zinc-700"
        aria-label={triggerLabel}
      >
        {icon}
      </button>
    </RadixPopover.Trigger>
    <RadixPopover.Portal>
      <RadixPopover.Content
        sideOffset={5}
        className="shadow-sm outline-none bg-zinc-100 min-h-[128px] overflow-y-auto min-w-[192px] max-w-[256px] dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded p-2"
        side={side}
        align="end"
      >
        {title && (
          <h4 className="mb-2 text-xs font-medium uppercase tracking-[1.5px] text-zinc-400 dark:text-zinc-500">
            {title}
          </h4>
        )}
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  </RadixPopover.Root>
);

export default Popover;
