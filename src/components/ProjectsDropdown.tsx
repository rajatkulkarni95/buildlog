import { useState } from "react";
import useSWR from "swr";
import { API_ENDPOINTS } from "~/constants/API";
import fetcher from "~/helpers/fetcher";
import { IProject } from "~/types";
import Dropdown from "./common/Dropdown";

const ProjectsDropdown = () => {
  const { data, error, isLoading } = useSWR<IProject>(
    API_ENDPOINTS.projects,
    fetcher
  );

  const [selectedProject, setSelectedProject] = useState("all-projects");

  if (error) {
    return <p>Something went wrong</p>;
  }

  const availableProjects = data?.projects.map((project) => ({
    label: project.name,
    id: project.id,
  }));

  availableProjects?.splice(0, 0, {
    label: "All Projects",
    id: "all-projects",
  });

  return (
    <Dropdown
      triggerLabel={
        availableProjects?.find((project) => project.id === selectedProject)
          ?.label
      }
      items={availableProjects}
      selectedId={selectedProject}
      handleOnClick={(id) => setSelectedProject(id)}
    />
  );
};

export default ProjectsDropdown;
