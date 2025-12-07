import React from "react";
import SnapshotFirebase from "./main-controller/main-controller";
// import FabThemeSelector from "./ui/fab-theme-selector";
import { createTheme } from "@mui/material/styles";
import ThemeProvider from "components/ui/themeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import "./app.scss";

const App: React.FC = () => {
	const initialTheme = createTheme();

	return (
		<ThemeProvider theme={initialTheme}>
			<CssBaseline />
			<div className="App"><SnapshotFirebase /></div>
		</ThemeProvider>
	);
};

export default App;
