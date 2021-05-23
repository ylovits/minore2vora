import React from 'react';
import useStore from 'store/globalStore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import './header.scss';

import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

interface IProps {
	logout: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		grow: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
			cursor: 'pointer',
			'&:hover': {
				color: fade(theme.palette.common.white, 0.85),
			},
		},
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: 'auto',
			},
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		inputRoot: {
			color: 'inherit',
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: '20ch',
			},
		}
	});
});
const Header: React.FC<IProps> = ({ logout }: IProps) => {
	/**
	 * Import global state parts needed
	 */
	const [goToPage] = useStore((state) => {
		return [state.goToPage];
	});

	const classes = useStyles();

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						onClick={() => {
							goToPage('song-list');
						}}
						className={classes.title}
						variant="h6"
						noWrap
					>
						Μινόρε του Βορρά
					</Typography>

					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					<IconButton
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={() => {
							return logout();
						}}
						color="inherit"
					>
						<ExitToAppIcon />
					</IconButton>

				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
