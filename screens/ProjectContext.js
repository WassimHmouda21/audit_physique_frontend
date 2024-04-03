import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [doneProjectsCount, setDoneProjectsCount] = useState('5');
  const [undoneProjectsCount, setUndoneProjectsCount] = useState('5');


  return (
    <ProjectContext.Provider
      value={{
        doneProjectsCount,
        setDoneProjectsCount,
        undoneProjectsCount,
        setUndoneProjectsCount,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  console.log('ProjectContext:', context); // Add this log
  return context;
};

