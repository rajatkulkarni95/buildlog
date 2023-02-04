import React, { useEffect, useRef } from "react";
import useSWRInfinite from "swr/infinite";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";
import { IDeploymentResponse } from "~/types";
import UpdateIcon from "~/svg/update.svg";
import DeploymentCard from "./Card";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";

interface IDeploymentsProps {
  selectedProject: string;
}

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

  const { data, error, setSize, size, isLoading, isValidating } =
    useSWRInfinite<IDeploymentResponse>(getKey, fetcher, {
      refreshInterval: 15 * 1000,
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    });

  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});

  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible && !isLoading && !isValidating) {
      setSize(size + 1);
    }
  }, [isVisible]);

  if (error) {
    return (
      <p className="flex justify-center items-center h-24">
        Something went wrong
      </p>
    );
  }

  return (
    <section className="p-3 flex flex-col h-full overflow-y-auto overflow-x-hidden hide_scrollbar">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Deployments
        </p>
        {(isLoading || isValidating) && (
          <UpdateIcon className="animate-spin text-zinc-400 dark:text-zinc-500 mr-3" />
        )}
      </div>
      {data?.map((page) => {
        return page.deployments.map((deployment) => {
          return (
            <DeploymentCard key={deployment.uid} deployment={deployment} />
          );
        });
      })}
      <div className="h-10 flex items-center justify-center" ref={ref}>
        {isLoading && (
          <UpdateIcon className="animate-spin text-zinc-400 dark:text-zinc-500 mr-3" />
        )}
      </div>
    </section>
  );
};

export default Deployments;
