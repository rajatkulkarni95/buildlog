import Image from "next/image";
import useSWR from "swr";
import Header from "~/components/common/Header";
import ProjectsDropdown from "~/components/ProjectsDropdown";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";
import { IUser } from "~/types";

const Dashboard = () => {
  const { data, error } = useSWR<IUser>(API_ENDPOINTS.user, fetcher);

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div>
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
            <p className="text-xs font-normal text-zinc-400 dark:text-zinc-400">
              {data?.user.username}
            </p>
          </section>
        </div>
        <ProjectsDropdown />
      </Header>
    </div>
  );
};

export default Dashboard;
