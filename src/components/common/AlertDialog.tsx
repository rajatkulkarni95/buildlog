import React from "react";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";

interface IAlertDialog {
  triggerLabel?: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  handleTriggerClick?: () => void;
  show?: boolean;
  handleConfirm?: () => void;
}

const AlertDialog = ({
  triggerLabel,
  title,
  description,
  confirmLabel,
  handleTriggerClick,
  show,
  handleConfirm,
}: IAlertDialog) => (
  <RadixAlertDialog.Root>
    <RadixAlertDialog.Trigger asChild>
      <button
        onClick={handleTriggerClick}
        className="py-1 mt-6 px-3 font-sans text-sm border w-full rounded border-red-500 bg-transparent text-red-500 hover:text-zinc-50 hover:bg-red-500"
      >
        {triggerLabel}
      </button>
    </RadixAlertDialog.Trigger>
    {show && (
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed inset-0 bg-black dark:bg-zinc-600 opacity-50" />
        <RadixAlertDialog.Content className="bg-zinc-50 dark:bg-zinc-900 rounded-md shadow-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] p-4">
          <RadixAlertDialog.Title className="text-xl font-medium mb-4">
            {title}
          </RadixAlertDialog.Title>
          <RadixAlertDialog.Description className="text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </RadixAlertDialog.Description>
          <div className="flex justify-end p-4">
            <RadixAlertDialog.Cancel asChild>
              <button className="py-1 px-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 hover:dark:bg-zinc-600 rounded mr-3 text-sm">
                Cancel
              </button>
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild onClick={handleConfirm}>
              <button className="py-1 px-3 bg-red-500 text-zinc-50 hover:bg-red-600 dark:bg-red-700 hover:dark:bg-red-600 rounded text-sm">
                {confirmLabel}
              </button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    )}
  </RadixAlertDialog.Root>
);

export default AlertDialog;
