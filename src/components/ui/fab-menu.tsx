import React from "react";
import Fab from "@material-ui/core/Fab";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
	return createStyles({
		fab: {
			position: "fixed",
			bottom: "1em",
			left: "1em",
		},
	});
});

interface IProps {
	toggleDrawer: () => void;
}

const FabMenu: React.FC<IProps> = ({ toggleDrawer }: IProps) => {
	const classes = useStyles();

	return (
		<Fab
			onClick={() => {
				toggleDrawer();
			}}
			color="secondary"
			aria-label="menu"
			className={classes.fab}
			size="small"
		>
			<SettingsIcon />
		</Fab>
	);
};

export default FabMenu;
