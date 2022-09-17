import React from "react";
import Fab from "@mui/material/Fab";
import SettingsIcon from "@mui/icons-material/Settings";
import "./fab-menu.scss";
interface IProps {
	toggleDrawer: () => void;
}

const FabMenu: React.FC<IProps> = ({ toggleDrawer }: IProps) => {
	return (
		<Fab
			onClick={() => {
				toggleDrawer();
			}}
			color="secondary"
			aria-label="menu"
			className="fabMenu"
			size="small"
		>
			<SettingsIcon />
		</Fab>
	);
};

export default FabMenu;
