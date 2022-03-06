import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { alpha, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "assets/img/logo.png";

interface IProps {
	logout: () => void;
	handleSearchChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
	showSearch: boolean
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
			display: "none",
			[theme.breakpoints.up("sm")]: {
				display: "block",
			},
			cursor: "pointer",
			"&:hover": {
				color: alpha(theme.palette.common.white, 0.85),
			},
		},
		homeBtn: {
			marginRight: theme.spacing(2),
			display: "block",
			width: "2rem",
			[theme.breakpoints.up("sm")]: {
				display: "none",
			},
			cursor: "pointer",
			"&:hover": {
				color: alpha(theme.palette.common.white, 0.85),
			},
		},
		search: {
			position: "relative",
			borderRadius: theme.shape.borderRadius,
			backgroundColor: alpha(theme.palette.common.white, 0.15),
			"&:hover": {
				backgroundColor: alpha(theme.palette.common.white, 0.25),
			},
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: "100%",
			[theme.breakpoints.up("sm")]: {
				marginLeft: theme.spacing(3),
				width: "auto",
			},
			flexGrow: 1,
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: "100%",
			position: "absolute",
			pointerEvents: "none",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		inputRoot: {
			color: "inherit",
			width:"100%"
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create("width"),
			width: "100%",
		}
	});
});
const Header: React.FC<IProps> = ({ logout, handleSearchChange, showSearch }: IProps) => {
	const navigate = useNavigate();
	const classes = useStyles();

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						onClick={() => {
							navigate("/song-list");
						}}
						className={classes.title}
						variant="h6"
						noWrap
					>
						Μινόρε του Βορρά
					</Typography>
					<img 
						src={HomeIcon}
						onClick={() => {
							navigate("/song-list");
						}}
						className={classes.homeBtn}
					/>

					<div className={classes.search}>
						{showSearch && (
							<>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Search…"
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ "aria-label": "search" }}
									onChange={handleSearchChange}
								/>
							</>)
						}
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
