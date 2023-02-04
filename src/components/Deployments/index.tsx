import React from "react";
import useSWRInfinite from "swr/infinite";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";
import { IDeploymentResponse } from "~/types";
import UpdateIcon from "~/svg/update.svg";
import DeploymentCard from "./Card";

interface IDeploymentsProps {
  selectedProject: string;
}

const Deployments = ({ selectedProject }: IDeploymentsProps) => {
  const getKey = (pageIndex: number, previousPageData: IDeploymentResponse) => {
    // reached the end
    if (previousPageData && !previousPageData.deployments) return null;

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
      // refreshInterval: 15 * 1000,
    });

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Deployments;
