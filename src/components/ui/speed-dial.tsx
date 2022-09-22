import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useChangeTheme } from "components/ui/themeProvider";
import useTheme from "@mui/material/styles/useTheme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import FilterListIcon from "@mui/icons-material/FilterList";
import SettingsIcon from "@mui/icons-material/Settings";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import AddIcon from '@mui/icons-material/Add';

import useStore from "store/globalStore";
import { useLocation, useNavigate } from "react-router-dom";
import "./speed-dial.scss";
import { alpha } from "@mui/material/styles";

const SpeedDialComp = () => {
	const location = useLocation();
	const navigate = useNavigate();

	/* Import global state parts needed */
	const [setShowChords, showChords, setShowDrawer, showDrawer, setShowFilters, showFilters, setSelectedSong] =
		useStore((state) => {
			return [
				state.setShowChords,
				state.showChords,
				state.setShowDrawer,
				state.showDrawer,
				state.setShowFilters,
				state.showFilters,
				state.setSelectedSong
			];
		});

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => { setOpen(true); };
	const handleClose = () => { setOpen(false); };

	const theme = useTheme();
	const changeTheme = useChangeTheme();

	const ACTION_NAMES = {
		FILTER: "Filter",
		EDIT_DELETE: "Edit/Delete",
		ADD_SONG: "Add Song",
		SWITCH_THEME: "Switch Theme",
		SHOW_CHORDS: "Show Chords"
	};

	const actions = [
		{ icon: <FilterListIcon />, name: ACTION_NAMES.FILTER, action: () => { setShowFilters(!showFilters); handleClose(); } },
		{ icon: <SettingsIcon />, name: ACTION_NAMES.EDIT_DELETE, action: () => { setShowDrawer(!showDrawer); } },
		{ icon: <AddIcon />, name: ACTION_NAMES.ADD_SONG, action: () => {
			setSelectedSong(null);
			navigate("/new-song");
		} },
		{ icon: theme.palette.mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />, name: ACTION_NAMES.SWITCH_THEME, action: () => { changeTheme(); }},
		{ icon: <BorderAllIcon />, name: ACTION_NAMES.SHOW_CHORDS, action: () => {setShowChords(!showChords); } }
	];



	return (
		<Box className="speedDial" sx={{ height: 400, transform: "translateZ(0px)", flexGrow: 1 }}>
			<Backdrop open={open} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				sx={{ position: "absolute", bottom: 5, right: 5, "& .MuiFab-primary": { 
					width: 45, 
					height: 45, 
					backgroundColor: alpha(theme.palette.primary.main, 0.2), 
					"&:hover": {backgroundColor: "primary"}
				} }}
				icon={<SpeedDialIcon />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}>
				{actions.map((action) => {
					let show = true;

					if ((location.pathname.match(/\/(.*?)\//) || [""])[1] === "song" && action.name === ACTION_NAMES.FILTER) {
						show = false;
					}

					if (
						(location.pathname === "/song-list"  && action.name === ACTION_NAMES.EDIT_DELETE) ||
						(location.pathname === "/song-list"  && action.name === ACTION_NAMES.SHOW_CHORDS)
					) {
						show = false;
					}

					if (location.pathname === "/edit-song" && action.name !== ACTION_NAMES.SWITCH_THEME) {
						show = false;
					}

					if (location.pathname === "/song-list" && action.name === ACTION_NAMES.ADD_SONG) {
						show = false;
					}

					if (show) {
						return (
							<SpeedDialAction
								key={action.name}
								icon={action.icon}
								tooltipTitle={action.name}
								tooltipOpen
								onClick={action.action}
								open={false}
							/>
						);
					}
					return null;
				})}
			</SpeedDial>
		</Box>
	);
};

export default SpeedDialComp;
