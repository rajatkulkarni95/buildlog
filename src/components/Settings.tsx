import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import GearIcon from "~/svg/gear.svg";
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

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleSetTheme = (id: string) => {
    setTheme(id);
  };

  return (
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
    </Popover>
  );
};

export default Settings;
