import React, { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";
import { IDeployment, IDeploymentResponse } from "~/types";
import UpdateIcon from "~/svg/update.svg";
import DeploymentCard from "./Card";
import { useIntersectionObserver } from "~/hooks";
import { sendNotification } from "@tauri-apps/api/notification";

interface IDeploymentsProps {
  selectedProject: string;
}

interface IInprogressDeployments {
  [key: string]: IDeployment;
}

const inProgressDeployments: IInprogressDeployments = {};

const Deployments = ({ selectedProject }: IDeploymentsProps) => {
  const getKey = (pageIndex: number, previousPageData: IDeploymentResponse) => {
    // reached the end
    if (previousPageData && !previousPageData.deployments.length) return null;

    if (selectedProject === "") {
      if (pageIndex === 0) return API_ENDPOINTS.deployments;

      return `${API_ENDPOINTS.deployments}?until=${previousPageData.pagination.next}`;
    } else {
      if (pageIndex === 0)
        return `${API_ENDPOINTS.deployments}?projectId=${selectedProject}`;

      return `${API_ENDPOINTS.deployments}?projectId=${selectedProject}&until=${previousPageData.pagination.next}`;
    }
  };

  const showNotifications =
    window.localStorage.getItem("notifications") === "yes" ? true : false;

  const frequency = parseInt(window.localStorage.getItem("frequency") || "15");

  const { data, error, setSize, size, isLoading, isValidating } =
    useSWRInfinite<IDeploymentResponse>(getKey, fetcher, {
      refreshInterval: frequency * 1000,
      revalidateOnFocus: false,
      refreshWhenHidden: showNotifications,
    });

  const totalDeployments = data
    ?.map((page) => page.deployments)
    .flat() as IDeployment[];

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});

  const isVisible = !!entry?.isIntersecting;

  const isDeploymentBuilding = () => {
    totalDeployments?.forEach((deployment) => {
      if (
        deployment.state === "BUILDING" &&
        !inProgressDeployments.hasOwnProperty(deployment.uid)
      ) {
        inProgressDeployments[deployment.uid] = deployment;
        sendNotification({
          title: "BuildLog",
          body: `${deployment.name} - Deployment started`,
        });
      } else if (
        deployment.state === "READY" &&
        inProgressDeployments.hasOwnProperty(deployment.uid)
      ) {
        let state = "";
        if (deployment.state === "READY") {
          state = "🎉 Deployed";
        } else if (deployment.state === "ERROR") {
          state = "❌ Failed";
        }
        sendNotification({
          title: "BuildLog",
          body: `${deployment.name} - ${state}`,
        });
        delete inProgressDeployments[deployment.uid];
      }
    });
  };

  useEffect(() => {
    if (showNotifications) {
      isDeploymentBuilding();
    }
  }, [totalDeployments]);

  useEffect(() => {
    if (isVisible && !isLoading && !isValidating) {
      setSize(size + 1);
    }
  }, [isVisible]);

  if (error) {
    return (
      <p className="flex justify-center items-center h-24">
        Something broke! Yeah that wasn't supposed to happen.
      </p>
    );
  }

  return (
    <section className="p-3 flex flex-col overflow-y-auto overflow-x-hidden hide_scrollbar h-full">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Deployments
        </p>
        {(isLoading || isValidating) && (
          <UpdateIcon className="animate-spin text-zinc-400 dark:text-zinc-500 mr-3" />
        )}
      </div>

      {totalDeployments?.map((deployment) => (
        <DeploymentCard key={deployment.uid} deployment={deployment} />
      ))}
      <div className="flex items-center justify-center" ref={ref}>
        {isLoading && (
          <UpdateIcon className="animate-spin text-zinc-400 dark:text-zinc-500 mr-3" />
        )}
      </div>
    </section>
  );
};

export default Deployments;
