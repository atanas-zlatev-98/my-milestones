import { createContext, useEffect } from "react";
import { createProject, getAllProjects } from "../../services/projectService";
import { useState } from "react";
import useAuth from "../auth/useAuth";

export const ProjectsContext = createContext({
  projects: [],
  createNewProjects: () => {},
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

  const contextValue = {
    projects,
    createNewProjects
  };

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
}
