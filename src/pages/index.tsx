import { useRouter } from "next/router";
import { Fragment } from "react";
import useSWR from "swr";
import Header from "~/components/common/Header";
import TokenRegistration from "~/components/TokenRegistration";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";

function Index() {
  const { data } = useSWR(API_ENDPOINTS.user, fetcher);
  const router = useRouter();

  if (data) {
    router.push("/dashboard");
  }

  return (
    <Fragment>
      <Header classes="flex-col">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
          BuildLog
        </h1>
        <p className="text-sm font-normal text-zinc-700 dark:text-zinc-200">
          Quickly displays your Vercel Deployments right in the menu bar for all
          your projects
        </p>
      </Header>
      <TokenRegistration />
    </Fragment>
  );
}

export default Index;
