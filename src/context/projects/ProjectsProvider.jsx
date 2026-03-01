import { createContext, useEffect } from "react";
import { completeProjects, createProject, getAllProjects, getProjectById, updateTaskItem} from "../../services/projectService";
import { useState } from "react";
import useAuth from "../auth/useAuth";

export const ProjectsContext = createContext({
  projects: [],
  createNewProjects: () => {},
  updateProjectTasks: () => {},
  completeProject: () => {},
});

export default function ProjectsProvider({ children }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjects(user.id);
        setProjects(projectsData.filter(project => !project.completed));
      } catch (err) {
        setErrors(`Failed to fetch projects: ${err}`);
      }
    };
    fetchProjects();
  }, [user?.id]);

  const createNewProjects = async (userId, projectData) => {
    try {
      const newProject = await createProject(userId, projectData);
      setProjects((prevProjects) => [...prevProjects, newProject]);
    } catch (err) {
      setErrors(`Failed to create project: ${err}`);
    }
  };

  const updateProjectTasks = async (projectId, taskId) => {
    try {
      
      const project = await getProjectById(projectId);
      
      if (!project) {
        setErrors("Project not found");
        return;
      }

      const updatedTasks = await updateTaskItem(project, taskId);

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === updatedTasks.id ? updatedTasks : project,
        ),
      );

    } catch (err) {
      setErrors(`Failed to update project tasks: ${err}`);
    }
  };

  const completeProject = async (projectId) => {
    try {
      
      const project = await getProjectById(projectId);

      if (!project) {
        setErrors("Project not found");
        return;
      }

      const updatedProject = await completeProjects(project);

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project ,
        ),
      );
      
    } catch (err) {
      setErrors(`Failed to complete project: ${err}`);
    }
  };

  const contextValue = {
    projects,
    createNewProjects,
    updateProjectTasks,
    completeProject
  };

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
}
