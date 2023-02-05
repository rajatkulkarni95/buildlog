import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import useSWR from "swr";
import Header from "~/components/common/Header";
import TokenRegistration from "~/components/TokenRegistration";

function Index() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }
  }, []);

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
