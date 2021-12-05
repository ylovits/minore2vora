import React from "react";
import  { useChangeTheme } from "components/ui/themeProvider";
import useTheme from "@material-ui/core/styles/useTheme";
import Fab from "@material-ui/core/Fab";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
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
			{theme.palette.type === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
		</Fab>
	);
};

export default FabThemeSelector;