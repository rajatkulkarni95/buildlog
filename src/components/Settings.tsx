import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import GearIcon from "~/svg/gear.svg";
import AlertDialog from "./common/AlertDialog";
import Popover from "./common/Popover";

const THEMES = [
  {
    label: "System",
    id: "system",
  },
  {
    label: "Light",
    id: "light",
  },
  {
    label: "Dark",
    id: "dark",
  },
];

const Settings = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleSetTheme = (id: string) => {
    setTheme(id);
  };

  const handleClickLogout = () => {
    setShowConfirmModal(true);
  };

  return (
    <Fragment>
      <Popover triggerLabel="Settings" icon={<GearIcon />} title="Settings">
        <div className="flex items-center justify-between">
          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
            Theme
          </span>{" "}
          <select
            value={theme}
            onChange={(e) => handleSetTheme(e.target.value)}
            className="appearance-none px-3 py-1 border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 font-sans text-sm rounded outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
          >
            {THEMES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <AlertDialog
          handleTriggerClick={handleClickLogout}
          confirmLabel="Log out"
          show={showConfirmModal}
          title="Are you absolutely sure?"
          description="You will be logged out and your access token will be deleted from local storage"
          triggerLabel="Log out"
          handleConfirm={() => {
            localStorage.removeItem("token");
            setTimeout(() => {
              router.push("/");
            }, 1);
          }}
        />
      </Popover>
    </Fragment>
  );
};

export default Settings;
