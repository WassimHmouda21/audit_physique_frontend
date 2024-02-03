import { AppRegistry } from 'react-native';
import Navigation from './Navigation';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Navigation);

// Use runApplication with the correct component
AppRegistry.runApplication(appName, { rootTag: 11 });
