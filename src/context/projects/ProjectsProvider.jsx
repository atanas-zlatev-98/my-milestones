import { createContext, useEffect } from "react";
import { completeProjects, createProject, getAllProjects,getProjectById, updateTaskItem ,delProject} from "../../services/projectService";
import { useState } from "react";
import useAuth from "../auth/useAuth";

export const ProjectsContext = createContext({
  projects: [],
  createNewProjects: () => {},
  updateProjectTasks: () => {},
  completeProject: () => {},
  refetchProjects: () => {},
  deleteProject: () => {},
  
});

export default function ProjectsProvider({ children }) {
  
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const projectsData = await getAllProjects(user.id);
      setProjects(projectsData);
    } catch (err) {
      setErrors(`Failed to fetch projects: ${err}`);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
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

      // setProjects((prevProjects) =>
      //   prevProjects.filter((project) => project.id !== updatedProject.id),
      // );

      setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );

    } catch (err) {
      setErrors(`Failed to complete project: ${err}`);
    }
  };

  const deleteProject = async (projectId) => {
    try{
        await delProject(projectId,user.id);
        setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId),
      );
    }catch(err){
      setErrors(`Failed to delete project: ${err}`);
    }
  }

  const contextValue = {
    projects,
    createNewProjects,
    updateProjectTasks,
    completeProject,
    refetchProjects: fetchProjects,
    deleteProject,
  };

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
}
