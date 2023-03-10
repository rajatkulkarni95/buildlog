import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import useSWR from "swr";
import Header from "~/components/common/Header";
import Deployments from "~/components/Deployments";
import ProjectsDropdown from "~/components/ProjectsDropdown";
import GearIcon from "~/svg/gear.svg";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";
import { IUser } from "~/types";
import Link from "next/link";

const Dashboard = () => {
  const { data, error } = useSWR<IUser, Error>(API_ENDPOINTS.user, fetcher);
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string>("");

  if (
    error?.message === "No token found" ||
    error?.message === "Not authenticated"
  ) {
    router.push("/");
  }

  const handleProjectChange = (id: string) => {
    setSelectedProject(id);
  };

  if (!data) return;

  return (
    <Fragment>
      <Header classes="justify-between">
        <div className="flex items-center">
          <Image
            src={`https://vercel.com/api/www/avatar/${data?.user.avatar}?s=60`}
            width={32}
            height={32}
            alt="Avatar"
            className="rounded-full"
          />
          <section className="ml-2 flex flex-col">
            <p className="text-base font-medium text-zinc-900 dark:text-zinc-50">
              {data?.user.name}
            </p>
            <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
              {data?.user.username}
            </p>
          </section>
        </div>
        <div className="flex items-center">
          <ProjectsDropdown
            selectedProject={selectedProject}
            handleProjectChange={handleProjectChange}
          />
          <Link href="/settings">
            <button className="ml-2 bg-transparent hover:bg-zinc-200 hover:dark:bg-zinc-700 p-2 rounded">
              <GearIcon />
            </button>
          </Link>
        </div>
      </Header>
      <Deployments selectedProject={selectedProject} />
    </Fragment>
  );
};

export default Dashboard;
