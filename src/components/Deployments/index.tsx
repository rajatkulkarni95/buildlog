import React from "react";
import useSWRInfinite from "swr/infinite";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";
import { IDeploymentResponse } from "~/types";
import DeploymentCard from "./Card";

const getKey = (pageIndex: number, previousPageData: IDeploymentResponse) => {
  // reached the end
  if (previousPageData && !previousPageData.deployments) return null;

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return API_ENDPOINTS.deployments;

  // add the cursor to the API endpoint
  return `${API_ENDPOINTS.deployments}?until=${previousPageData.pagination.next}`;
};

const Deployments = () => {
  const { data, error, setSize, size } = useSWRInfinite<IDeploymentResponse>(
    getKey,
    fetcher
  );

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <React.Fragment>
      {data?.map((page) => {
        return page.deployments.map((deployment) => {
          return (
            <DeploymentCard key={deployment.uid} deployment={deployment} />
          );
        });
      })}
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </React.Fragment>
  );
};

export default Deployments;
