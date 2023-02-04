import { IDeployment } from "~/types";
import CommitIcon from "~/svg/commit.svg";
import ProjectIcon from "~/svg/archive.svg";
import ClockIcon from "~/svg/clock.svg";
import BranchIcon from "~/svg/branch.svg";
import CheckCircledIcon from "~/svg/check-circled.svg";
import CrossCircledIcon from "~/svg/cross-circled.svg";
import OpenInNewWindowIcon from "~/svg/open-in-new-window.svg";
import VercelIcon from "~/svg/vercel-logo.svg";
import UpdateIcon from "~/svg/update.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IDeploymentCardProps {
  deployment: IDeployment;
}

const DeploymentCard = ({ deployment }: IDeploymentCardProps) => {
  const { meta, name, url, ready, creator, state, createdAt, inspectorUrl } =
    deployment;

  const renderIcon = () => {
    switch (state) {
      case "READY":
        return (
          <CheckCircledIcon className="text-green-500 h-4 w-4 dark:text-green-400" />
        );
      case "ERROR":
        return (
          <CrossCircledIcon className="text-red-500 h-4 w-4 dark:text-red-400" />
        );
      case "BUILDING":
        return (
          <UpdateIcon className="text-amber-500 dark:text-amber-400 animate-spin" />
        );
      default:
        break;
    }
  };

  const renderCompletionTime = () => {
    const completionSeconds = dayjs(ready).diff(dayjs(createdAt), "s");

    if (completionSeconds < 60) {
      return `${completionSeconds}s`;
    } else {
      const minutes = Math.floor(completionSeconds / 60);
      const seconds = completionSeconds % 60;

      return `${minutes}m ${seconds}s`;
    }
  };

  return (
    <div className="mb-1 flex items-center rounded border border-zinc-300 dark:border-zinc-700 w-full bg-transparent hover:bg-zinc-100 hover:dark:bg-zinc-800">
      <section className="flex flex-col items-center mr-3 pl-2">
        {renderIcon()}{" "}
      </section>{" "}
      <section className="py-2">
        <div className="flex items-center mb-1">
          <ProjectIcon className="mr-1 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />{" "}
          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
            {name}
          </span>
        </div>
        <div className="flex items-center mb-1">
          <CommitIcon className="mr-1 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />{" "}
          <a
            href={`https://github.com/${meta.githubCommitOrg}/${meta.githubCommitRepo}/commit/${meta.githubCommitSha}`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline cursor-pointer w-[320px] truncate"
          >
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {meta.githubCommitMessage}
            </span>
          </a>
        </div>
        <div className="flex items-center mb-2">
          <BranchIcon className="mr-1 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />{" "}
          <a
            href={`https://github.com/${meta.githubCommitOrg}/${meta.githubCommitRepo}/tree/${meta.githubCommitRef}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs hover:underline font-normal text-zinc-500 dark:text-zinc-400"
          >
            {meta.githubCommitRef}
          </a>
        </div>
        <div className="flex items-center mb-1">
          <ClockIcon className="mr-1 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />{" "}
          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
            {dayjs(ready).fromNow()} by {creator.username}
          </span>
        </div>
      </section>
      <section className="flex flex-col justify-center w-12 h-full ml-auto">
        <a
          href={`https://${url}`}
          className="rounded-tr flex items-center justify-center bg-zinc-900 dark:bg-zinc-50 dark:hover:bg-zinc-200 hover:bg-zinc-700 border-b flex-1 border-zinc-400 dark:border-zinc-500"
          target="_blank"
          rel="noreferrer"
        >
          <OpenInNewWindowIcon className="text-zinc-50 dark:text-zinc-900" />
        </a>
        <a
          href={inspectorUrl}
          className="rounded-br flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 flex-1 hover:bg-neutral-300 hover:dark:bg-neutral-700"
          target="_blank"
          rel="noreferrer"
        >
          <VercelIcon className="text-zinc-900 dark:text-zinc-50" />
        </a>
      </section>
    </div>
  );
};

export default DeploymentCard;
