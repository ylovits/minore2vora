import React, { useContext } from 'react';
import SnapshotFirebase from './main-controller/main-controller';
import { AuthContext } from '../auth/auth';
import Login from '../auth/login';
import FabThemeSelector from './ui/fab-theme-selector';
import { createTheme } from '@material-ui/core/styles';
import ThemeProvider from 'components/ui/themeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import './app.scss';

const App: React.FC = () => {
	const initialTheme = createTheme({
		palette: {
			type: 'light',
		}
	});

	const { user } = useContext(AuthContext);

	return (
		<ThemeProvider theme={initialTheme}>
			<CssBaseline />
			<div className="App">{user ? <SnapshotFirebase /> : <Login />}</div>
			<FabThemeSelector />
		</ThemeProvider>
	);
};

export default App;
