import { createContext, useEffect } from "react";
import { createProject, getAllProjects,updateTaskItem } from "../../services/projectService";
import { useState } from "react";
import useAuth from "../auth/useAuth";

export const ProjectsContext = createContext({
  projects: [],
  createNewProjects: () => {},
  updateProjectTasks: () => {},
});

export default function ProjectsProvider({ children }) {

  const {user} = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {

    if (!user?.id) return;

    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjects(user.id);
        setProjects(projectsData);
      } catch (err) {
        setErrors(`Failed to fetch projects: ${err}`);
      }
    };
    fetchProjects();
  }, [user?.id]);

  const createNewProjects = async(userId,projectData) =>{
    
    try{
        const newProject = await createProject(userId,projectData);
        setProjects((prevProjects) => [...prevProjects, newProject]);
    }catch(err){
        setErrors(`Failed to create project: ${err}`);
    }
  }

  const updateProjectTasks = async (projectId,taskId) => {
    try{
      const findProject = projects.find(project => project.id === projectId);
      if(!findProject){
        throw new Error('Project not found');
      }
      const updatedTasks = await updateTaskItem(findProject,taskId);
      setProjects((prevProjects) => prevProjects.map((project) =>project.id === updatedTasks.id ? updatedTasks : project));
    }catch(err){
      setErrors(`Failed to update project tasks: ${err}`);
    }
  }

  const contextValue = {
    projects,
    createNewProjects,
    updateProjectTasks
  };

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
}
