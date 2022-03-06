import React, { useState, useEffect, lazy, useContext } from "react";
import { AuthContext } from "auth/auth";
import Login from "auth/login";
import firebase from "../../firebase";
import { ISong } from "../../interfaces/interfaces";
import useStore from "store/globalStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "components/layout/header";
import {
	Snackbar,
	Grid,
	IconButton,
	Backdrop,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { reduceToGreeklish, stringToSlug } from "utils/characterMap";


/* Styles */
const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: "#fff",
		},
	});
});


/* Lazy load all "page" components for code splitting */
const SongList = lazy(() => { 
	return import("components/song-list/song-list");
});
const Song = lazy(() => {
	return import("components/song/song");
});
const SongForm = lazy(() => {
	return import("components/song-form/song-form");
});


const SnapshotFirebase: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useContext(AuthContext);

	/* load styles */
	const classes = useStyles();
	
	/* Import global state parts needed */
	const [_glob, selectedSong, setSelectedSong, songs, setSongs, setTempUrl, tempUrl] = useStore((state) => {
		return [state, state.selectedSong, state.setSelectedSong, state.songs, state.setSongs, state.setTempUrl, state.tempUrl];
	});

	// Uncomment those lines to get global state logging, also the appConfig import
	// console.log('Global state:', _glob.selectedSong);

	/* loading */ 
	const [loading, setLoading] = useState(false);


	const ref = firebase.firestore().collection("songs");

	const getSongs = () => {
		setLoading(true);
		ref.onSnapshot((querySnapshot) => {
			const items: ISong[] = [];
			querySnapshot.forEach((doc) => {
				items.push({ ...doc.data(), id: doc.id } as ISong);
			});
			setSongs(items);
			setLoading(false);
		});
	};

	const handleAddSong = (song: ISong) => {
		setLoading(true);
		ref.add(song)
			.then(() => {
				navigate("/song-list");
			}).then(() => {
				setLoading(false);
			})
			.catch((err: Error) => {
				console.error(err);
			});
	};

	const handleEditSong = (song: ISong) => {
		setLoading(true);
		if (song.id !== "") {
			ref.doc(song.id)
				.update(song)
				.then(() => {
					navigate("/song-list");
				}).then(() => {
					setLoading(false);
				})
				.catch((err: Error) => {
					console.error(err);
				});
		}
	};

	useEffect(() => {
		getSongs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logout = () => {
		firebase.auth().signOut();
	};


	
	/**
	 * snackbar
	 */
	const [openSnackBar, setOpenSnackBar] = useState(false);
		
	const handleSuccess = () => {
		setOpenSnackBar(true);
	};

	const handleCloseSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		
		setOpenSnackBar(false);
	};


	const [showDeletePopup, setShowDeletePopup] = useState(false);

	const deleteSong = (song: ISong) => {
		setLoading(true);
		if (song.id !== "") {
			ref.doc(song.id)
				.delete()
				.then(() => {
					navigate("/song-list");
				}).then(() => {
					setLoading(false);
				})
				.catch((err: Error) => {
					console.error(err);
				});
		}
	};

	const handleDeleteSong = (song: ISong) => {
		setShowDeletePopup(false);
		deleteSong(song);
	};

	/**
	 * Searching
	 */
	const [searchTerm, setSearchTerm] = useState("");
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const modifiedSearch = reduceToGreeklish(event.target.value).toLowerCase();
		setSearchTerm(modifiedSearch);
	};

	const [showSearch, setShowSearch] = useState(false);

	// "Routing"
	useEffect(() => {
		const locationBase = (location.pathname.match(/\/(.*?)\//) || [""])[1];
		if (locationBase === "song") {
			const currentSong = songs.find((song) => {
				return stringToSlug(song.title) === location.pathname.split("song/").pop();
			});
			currentSong ? setSelectedSong(currentSong) : navigate("/song-list");
		} else if (["/login", "/song-list"].includes(location.pathname)) {
			setSelectedSong(null);
		}
			
		if (location.pathname === "/song-list") {
			setShowSearch(true);
		} else {
			setShowSearch(false);
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);
	
	useEffect(() => {
		if ((location.pathname.match(/\/(.*?)\//) || [""])[1] === "song") {
			setTempUrl(location.pathname);
		}
	}, []);
	
	/* loading screen */
	if (loading) {
		return (
			<Backdrop className={classes.backdrop} open={true} >
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}

	return (
		<React.Fragment>
			<Grid container direction="row" justifyContent="center" alignItems="center">
				<Header logout={logout} handleSearchChange={handleSearchChange} showSearch={showSearch}/>
			</Grid>
			<React.Suspense fallback={<Backdrop className={classes.backdrop} open={true} ><CircularProgress color="inherit" /></Backdrop>}>
				<Grid item xs={12}>
					<Routes>
						{user ? (
							<>
								<Route path="/" element={<Navigate to="song-list"/>} />
								<Route path="/song/:title" element={<Song song={selectedSong as ISong} 
									setShowDeletePopup={() => { setShowDeletePopup (true);}} />} 
								/>
								<Route path="/song-list" element={<SongList searchTerm={searchTerm}/>} />
								<Route path="/new-song" element={<SongForm handleSubmit={handleAddSong} handleSuccess={handleSuccess} />} />
								<Route path="/edit-song" element={<SongForm handleSubmit={handleEditSong} handleSuccess={handleSuccess} />} />
								<Route path="*" element={<Navigate to={tempUrl ? tempUrl : "song-list"}/>} />	
							</>
						) : (
							<>
								<Route path="/" element={<Navigate to="login" />} />
								<Route path="/login" element={<Login />} />
								<Route path="*" element={<Navigate to="login" />} />	
							</>
						)}		

					</Routes>
				</Grid>
			</React.Suspense>

			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={openSnackBar}
				autoHideDuration={2000}
				onClose={handleCloseSnackBar}
				message="Song saved!"
				action={
					<React.Fragment>
						<IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackBar}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
			/>
			<Dialog
				open={showDeletePopup}
				onClose={() => { setShowDeletePopup(false); }}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this song?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						All of this song data will be FOREVER lost!!!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => { setShowDeletePopup(false); }} color="primary">
						Cancel
					</Button>
					<Button onClick={() => { selectedSong && handleDeleteSong(selectedSong); }} color="secondary" autoFocus>
						Delete Song
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default SnapshotFirebase;
