import { useState } from "react";
import useSWR from "swr";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";
import { IProject } from "~/types";
import Dropdown from "./common/Dropdown";

interface IProjectDropdownProps {
  handleProjectChange: (id: string) => void;
  selectedProject: string;
}

const ProjectsDropdown = ({
  handleProjectChange,
  selectedProject,
}: IProjectDropdownProps) => {
  const { data, error } = useSWR<IProject>(API_ENDPOINTS.projects, fetcher, {
    revalidateOnFocus: false,
  });

  if (error) {
    return <p>Something went wrong</p>;
  }

  const availableProjects = data?.projects.map((project) => ({
    label: project.name,
    id: project.id,
  }));

  availableProjects?.splice(0, 0, {
    label: "All Projects",
    id: "",
  });

  return (
    <Dropdown
      triggerLabel={
        availableProjects?.find((project) => project.id === selectedProject)
          ?.label
      }
      items={availableProjects}
      selectedId={selectedProject}
      handleOnClick={handleProjectChange}
    />
  );
};

export default ProjectsDropdown;
