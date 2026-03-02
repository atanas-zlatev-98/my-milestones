import { createContext, useEffect } from "react";
import { completeProjects, createProject, getAllProjects, updateTaskItem ,delProject} from "../../services/projectService";
import { useState } from "react";
import useAuth from "../auth/useAuth";
import { set } from "zod";

export const ProjectsContext = createContext({
  projects: [],
  error: null,
  isLoading: null,
  createNewProjects: () => {},
  updateProjectTasks: () => {},
  completeProject: () => {},
  refetchProjects: () => {},
  deleteProject: () => {},
  clearError: () => {},
});

export default function ProjectsProvider({ children }) {
  
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState({
    fetchError: null,
    createError: null,
    updateError: null,
    completeError: null,
    deleteError: null,
  });

  const fetchProjects = async () => {
    try {
      const projectsData = await getAllProjects(user.id);
      setProjects(projectsData);
      setIsLoading(false);
    } catch (err) {
        setError({...error, fetchError: `Failed to fetch projects: ${err.message}`});
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
      setError({ ...error, createError: `Failed to create project: ${err.message}` });
    }
  };

  const updateProjectTasks = async (project, taskId) => {
    
    try {
      const updatedTasks = await updateTaskItem(project, taskId);
        setProjects((prevProjects) => prevProjects.map((project) => project.id === updatedTasks.id ? updatedTasks : project));
      return true;
    } catch (err) {
        setError({ ...error, updateError: `Failed to update project tasks: ${err.message}` });
      return false;
    }
  };

  const completeProject = async (project) => {

    try {
      const updatedProject = await completeProjects(project);
        setProjects((prevProjects) => prevProjects.map((project) =>project.id === updatedProject.id ? updatedProject : project));
      return true;

    } catch (err) {
        setError({ ...error, completeError: `Failed to complete project: ${err.message}`});
      return false;
    }
  };

  const deleteProject = async (projectId) => {

    try{
        await delProject(projectId,user.id);
          setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
        return true;
    }catch(err){
      setError({ ...error, deleteError: `Failed to delete project: ${err.message}`});
      return false;
    }
  }

  const contextValue = {
    projects,
    error,
    isLoading,
    createNewProjects,
    updateProjectTasks,
    completeProject,
    refetchProjects: fetchProjects,
    deleteProject,
    clearError:()=>setError({fetchError: null, createError: null, updateError: null, completeError: null, deleteError: null}),
  };

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
}
