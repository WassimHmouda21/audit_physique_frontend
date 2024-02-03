// index.js
import { AppRegistry } from 'react-native';
import YourApp from './YourApp';
import { name as appName } from './app.json';

// Register the main App component
AppRegistry.registerComponent(appName, () => YourApp);

// Run the app
AppRegistry.runApplication(appName, { rootTag: 11 });
