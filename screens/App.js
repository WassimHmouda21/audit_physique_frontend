import React from 'react';
import { ProjectProvider } from './ProjectContext';
import ProgressionScreen from './ProgressionScreen';
import HomeScreen from './HomeScreen'; // Assuming HomeScreen is also part of your app

const App = () => {
  return (
    <ProjectProvider>
      <HomeScreen />
      {/* Other screens */}
    </ProjectProvider>
  );
};

export default App;
