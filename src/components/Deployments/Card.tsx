import { IDeployment } from "~/types";
import CommitIcon from "~/svg/commit.svg";
import ProjectIcon from "~/svg/archive.svg";
import ClockIcon from "~/svg/clock.svg";
import BranchIcon from "~/svg/branch.svg";
import CheckCircledIcon from "~/svg/check-circled.svg";
import CrossCircledIcon from "~/svg/cross-circled.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IDeploymentCardProps {
  deployment: IDeployment;
}

const DeploymentCard = ({ deployment }: IDeploymentCardProps) => {
  const { meta, name, ready, creator, state, createdAt } = deployment;

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
      default:
        break;
    }
  };

  return (
    <div className="p-2 mb-1 flex items-center rounded border border-zinc-300 dark:border-zinc-700 w-full bg-transparent hover:bg-zinc-100 hover:dark:bg-zinc-800">
      <section className="flex flex-col mr-3">
        {renderIcon()}{" "}
        {/* <span className="text-xs text-zinc-500 dark:text-zinc-400 mr-1">
          {dayjs(createdAt).diff(dayjs(ready))}
        </span> */}
      </section>{" "}
      <section>
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
            className="hover:underline cursor-pointer"
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
    </div>
  );
};

export default DeploymentCard;
