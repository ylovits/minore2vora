import React from "react";
import { useChangeTheme } from "components/ui/themeProvider";
import useTheme from "@mui/material/styles/useTheme";
import Fab from "@mui/material/Fab";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./fab-theme-selector.scss";

const FabThemeSelector: React.FC = () => {
	const theme = useTheme();
	const changeTheme = useChangeTheme();
	return (
		<Fab
			onClick={ () => { changeTheme(); }}
			color="primary"
			aria-label="add"
			className="fabThemeSelector"
			size="small"
		>
			{theme.palette.mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
		</Fab>
	);
};

export default FabThemeSelector;