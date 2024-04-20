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
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import PrintIcon from "@mui/icons-material/Print";
import useStore from "store/globalStore";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeDispatchContext } from "components/ui/themeProvider";
import "./speed-dial.scss";

const SpeedDialComp = () => {

	const dispatch = React.useContext(ThemeDispatchContext);
	const location = useLocation();
	const navigate = useNavigate();

	/* Import global state parts needed */
	const [
		setShowChords,
		showChords,
		setShowDrawer,
		showDrawer,
		setShowFilters,
		showFilters,
		setSelectedSong,
		setActivePlaylist,
		showAvailableLists,
		setShowAvailableLists
	] =
		useStore((state) => {
			return [
				state.setShowChords,
				state.showChords,
				state.setShowDrawer,
				state.showDrawer,
				state.setShowFilters,
				state.showFilters,
				state.setSelectedSong,
				state.setActivePlaylist,
				state.showAvailableLists,
				state.setShowAvailableLists
			];
		});

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => { setOpen(true); };
	const handleClose = () => { setOpen(false); };

	const theme = useTheme();
	const changeTheme = useChangeTheme();

	const ACTION_NAMES = {
		FILTER: "Filter",
		MANGE_SONG: "Manage Song",
		CREATE_SONG: "New Song",
		SWITCH_THEME: "Switch Theme",
		SHOW_CHORDS: "Show Chords",
		SHOW_PLAYLISTS: "Playlists",
		MANAGE_PLAYLIST: "Manage Playlist",
		CREATE_PLAYLIST: "New Playlist",
		ADD_SONG_TO_PLAYLIST: "Add To Playlist",
		ADD_SONGS_TO_PLAYLIST: "Add Songs",
		PRINT_LIST: "Print Playlist"
	};

	const actions = [
		{
			icon: theme.palette.mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />,
			name: ACTION_NAMES.SWITCH_THEME,
			action: () => {
				setOpen(false);
				setTimeout(() => {
					changeTheme();
				}, 200);
			},
			fabProps: {
				sx: {
					bgcolor: "primary.main",
					"&:hover": {
						bgcolor: "primary.main",
					},
					color: "#fff"
				}
			}
		},
		{
			icon: <ListIcon />,
			name: ACTION_NAMES.SHOW_PLAYLISTS,
			action: () => {
				setOpen(false);
				setTimeout(() => {
					navigate("/playlists");
				}, 200);
			},
			fabProps: {
				sx: {
					bgcolor: "primary.main",
					"&:hover": {
						bgcolor: "primary.main",
					},
					color: "#fff"
				}
			}
		},
		{
			icon: <SettingsIcon />,
			name: ACTION_NAMES.MANGE_SONG,
			action: () => {
				setOpen(false);
				setTimeout(() => {
					setShowDrawer(!showDrawer);
				}, 200);
			},
			fabProps: {
				sx: {
					bgcolor: "warning.main",
					"&:hover": {
						bgcolor: "warning.main",
					},
					color: "#fff"
				}
			}
		},
		{
			icon: <SettingsIcon />,
			name: ACTION_NAMES.MANAGE_PLAYLIST,
			action: () => {
				setOpen(false);
				setTimeout(() => {
					navigate("/edit-playlist");
				}, 200);
			},
			fabProps: {
				sx: {
					bgcolor: "warning.main",
					"&:hover": {
						bgcolor: "warning.main",
					},
					color: "#fff"
				}
			}
		},
		{
			icon: <PlaylistAddCircleIcon />,
			name: ACTION_NAMES.CREATE_PLAYLIST,
			action: () => {
				setOpen(false);
				setTimeout(() => {
					setActivePlaylist("");
					navigate("/new-playlist");
				}, 200);
			},
			fabProps: {
				sx: {
					bgcolor: "success.main",
					"&:hover": {
						bgcolor: "success.main",
					},
					color: "#fff"
				}
			}
		},
		{
			icon: <AddIcon />,
			name: ACTION_NAMES.CREATE_SONG,
			action: () => {
				setOpen(false);
				setTimeout(() => {
					setSelectedSong(null);
					navigate("/new-song");
				}, 200);
			},
			fabProps: {
				sx: {
					bgcolor: "success.main",
					"&:hover": {
						bgcolor: "success.main",
					},
					color: "#fff"
				}
			}
		},
		{
			icon: <BorderAllIcon />,
			name: ACTION_NAMES.SHOW_CHORDS,
			action: () => { 
				setOpen(false);
				setTimeout(() => {
					setShowChords(!showChords); 
				}, 200);
			},
			fabProps: {
				sx: {
					bgcolor: "secondary.main",
					"&:hover": {
						bgcolor: "secondary.main",
					},
					color: "#fff"
				}
			}
		},
		{
			icon: <FilterListIcon />,
			name: ACTION_NAMES.FILTER,
			action: () => { 
				setOpen(false);
				setTimeout(() => {
					setShowFilters(!showFilters); 
				}, 200);
			},
			fabProps: {
				sx: {
					bgcolor: "secondary.main",
					"&:hover": {
						bgcolor: "secondary.main",
					},
					color: "#fff"
				}
			}
		},
		{
			icon: <PlaylistAddIcon />,
			name: ACTION_NAMES.ADD_SONG_TO_PLAYLIST,
			action: () => {
				setOpen(false);
				setTimeout(() => {
					setShowAvailableLists(!showAvailableLists);
				}, 200);
			},
			fabProps: {
				sx: {
					bgcolor: "secondary.main",
					"&:hover": {
						bgcolor: "secondary.main",
					},
					color: "#fff"
				}
			}
		},
		{
			icon: <PrintIcon />,
			name: ACTION_NAMES.PRINT_LIST,
			action: () => {
				setOpen(false);
				setTimeout(() => {
					dispatch({ type: "changeTheme", payload: "light"});
				}, 200);
				setTimeout(() => {
					window.print();
				}, 300);
			},
			fabProps: {
				sx: {
					bgcolor: "secondary.main",
					"&:hover": {
						bgcolor: "secondary.main",
					},
					color: "#fff"
				}
			}
		},
	];



	return (<>
		<Backdrop open={open} />
		<Box className="speedDial" sx={{ height: 700, transform: "translateZ(0px)", flexGrow: 1 }}>
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				sx={{
					position: "absolute", bottom: 5, right: 5, "& .MuiFab-primary": {
						width: 45,
						height: 45,
					}
				}}
				FabProps={{
					sx: {
						bgcolor: "info.main",
						"&:hover": {
							bgcolor: "info.main",
						}
					}
				}
				}
				icon={<SpeedDialIcon />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}>
				{actions.map((action) => {
					let show = true;

					if (location.pathname !== "/song-list" && action.name === ACTION_NAMES.FILTER) {
						show = false;
					}

					if (
						(!location.pathname.startsWith("/song/") && action.name === ACTION_NAMES.MANGE_SONG) ||
						(!location.pathname.startsWith("/song/") && action.name === ACTION_NAMES.SHOW_CHORDS)
					) {
						show = false;
					}

					if (location.pathname === "/edit-song" && action.name !== ACTION_NAMES.SWITCH_THEME) {
						show = false;
					}

					if (location.pathname !== "/song-list" && action.name === ACTION_NAMES.CREATE_SONG) {
						show = false;
					}

					if (location.pathname === "/playlists" && action.name === ACTION_NAMES.SHOW_PLAYLISTS) {
						show = false;
					}

					if (!location.pathname.startsWith("/playlist/") && action.name === ACTION_NAMES.MANAGE_PLAYLIST) {
						show = false;
					}

					if (location.pathname !== "/playlists" && action.name === ACTION_NAMES.CREATE_PLAYLIST) {
						show = false;
					}

					if (!location.pathname.startsWith("/song/") && action.name === ACTION_NAMES.ADD_SONG_TO_PLAYLIST) {
						show = false;
					}

					if (!location.pathname.startsWith("/playlist/") && action.name === ACTION_NAMES.ADD_SONGS_TO_PLAYLIST) {
						show = false;
					}

					if (!location.pathname.startsWith("/playlist/") && action.name === ACTION_NAMES.PRINT_LIST) {
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
								FabProps={action.fabProps}
								color={"#fff"}
							/>
						);
					}
					return null;
				})}
			</SpeedDial>
		</Box>
	</>);
};

export default SpeedDialComp;
