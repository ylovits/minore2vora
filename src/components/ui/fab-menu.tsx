import React from 'react';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		fab: {
			position: 'fixed',
			bottom: theme.spacing(1),
			left: theme.spacing(1),
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
