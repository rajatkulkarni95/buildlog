import React from "react";
import useSWRInfinite from "swr/infinite";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";
import { IDeploymentResponse } from "~/types";
import UpdateIcon from "~/svg/update.svg";
import DeploymentCard from "./Card";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";
import { useEffect } from "react";

const getKey = (pageIndex: number, previousPageData: IDeploymentResponse) => {
  // reached the end
  if (previousPageData && !previousPageData.deployments) return null;

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return API_ENDPOINTS.deployments;

  // add the cursor to the API endpoint
  return `${API_ENDPOINTS.deployments}?until=${previousPageData.pagination.next}`;
};

const Deployments = () => {
  const { data, error, setSize, size, isLoading, isValidating } =
    useSWRInfinite<IDeploymentResponse>(getKey, fetcher, {
      // refreshInterval: 15 * 1000,
    });

  if (error) {
    return <p>Something went wrong</p>;
  }

  useEffect(() => {
    async function startNotificationStream() {
      let permissionGranted = await isPermissionGranted();
      if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === "granted";
      }
      if (permissionGranted) {
        console.log("hello");

        sendNotification({ title: "TAURI", body: "Tauri is awesome!" });
      }
    }
    // if (state === "ERROR") {
    startNotificationStream();
    // }
  }, []);

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
