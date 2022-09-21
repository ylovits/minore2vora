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
import useStore from "store/globalStore";
import { useLocation } from "react-router-dom";
import "./speed-dial.scss";

const SpeedDialComp = () => {
	const location = useLocation();

	/* Import global state parts needed */
	const [setShowChords, showChords, setShowDrawer, showDrawer, setShowFilters, showFilters] =
		useStore((state) => {
			return [
				state.setShowChords,
				state.showChords,
				state.setShowDrawer,
				state.showDrawer,
				state.setShowFilters,
				state.showFilters
			];
		});

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => { setOpen(true); };
	const handleClose = () => { setOpen(false); };

	const theme = useTheme();
	const changeTheme = useChangeTheme();

	const actions = [
		{ icon: <FilterListIcon />, name: "Filter", action: () => { setShowFilters(!showFilters); handleClose(); } },
		{ icon: <SettingsIcon />, name: "Edit/Delete", action: () => { setShowDrawer(!showDrawer); } },
		{ icon: theme.palette.mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />, name: "Switch Theme", action: () => { changeTheme(); }},
		{ icon: <BorderAllIcon />, name: "Show Chords", action: () => {setShowChords(!showChords); } }
	];
	return (
		<Box className="speedDial" sx={{ height: 170, transform: "translateZ(0px)", flexGrow: 1 }}>
			<Backdrop open={open} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				sx={{ position: "absolute", bottom: 8, right: 8 }}
				icon={<SpeedDialIcon />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}>
				{actions.map((action) => {
					let show = true;

					if ((location.pathname.match(/\/(.*?)\//) || [""])[1] === "song" && action.name === "Filter") {
						show = false;
					}

					if (
						(location.pathname === "/song-list"  && action.name === "Edit/Delete") ||
						(location.pathname === "/song-list"  && action.name === "Show Chords")
					) {
						show = false;
					}

					if (location.pathname === "/edit-song" && action.name !== "Switch Theme") {
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
