import { Fragment } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { IDeployment } from "~/types";
import CommitIcon from "~/svg/commit.svg";
import ProjectIcon from "~/svg/archive.svg";
import ClockIcon from "~/svg/clock.svg";
import BranchIcon from "~/svg/branch.svg";
import CheckCircledIcon from "~/svg/check-circled.svg";
import CrossCircledIcon from "~/svg/cross-circled.svg";
import VercelIcon from "~/svg/vercel-logo.svg";
import UpdateIcon from "~/svg/update.svg";

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
        <div className="flex items-center mb-1">
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
        <div className="flex items-center">
          <ClockIcon className="mr-1 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />{" "}
          <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 mr-1 max-w-[220px] truncate">
            {dayjs(ready).fromNow()} by {creator.username} &nbsp;
          </span>
          &#8226;
          <a
            href={inspectorUrl}
            className="flex items-center justify-center hover:underline ml-2 mr-2"
            target="_blank"
            rel="noreferrer"
          >
            <VercelIcon className="text-zinc-900 dark:text-zinc-50 mr-1" />{" "}
            <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
              Inspector
            </span>
          </a>
          {state === "READY" && (
            <Fragment>
              &#8226;
              <a
                href={`https://${url}`}
                className="ml-2 text-zinc-900 dark:text-zinc-50 hover:underline text-xs"
                target="_blank"
                rel="noreferrer"
              >
                View Site
              </a>
            </Fragment>
          )}
        </div>
      </section>
    </div>
  );
};

export default DeploymentCard;
