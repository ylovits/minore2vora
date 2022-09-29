import React, { useState, useEffect, lazy, useContext, SyntheticEvent } from "react";
import { AuthContext } from "auth/auth";
import firebase from "../../firebase";
import { IPlaylist, ISong } from "../../interfaces/interfaces";
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
	SnackbarCloseReason
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { reduceToGreeklish, stringToSlug } from "utils/characterMap";
import SpeedDialComp from "../ui/speed-dial";
import "./main-controller.scss";


/* Lazy load all "page" components for code splitting */
const SongList = lazy(() => { return import("components/song-list/song-list"); });
const Song = lazy(() => { return import("components/song/song"); });
const SongForm = lazy(() => { return import("components/song-form/song-form"); });
const Playlists = lazy(() => { return import("components/playlists/playlists"); });
const Playlist = lazy(() => { return import( "components/playlists/playlist/playlist"); });
const PlaylistForm = lazy(() => { return import("components/playlist-form/playlist-form"); });
const PrintList = lazy(() => { return import("components/print-list/print-list"); });
const Login = lazy(() => { return import("auth/login"); });

const SnapshotFirebase: React.FC = () => {

	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useContext(AuthContext);

	/* load styles */

	/* Import global state parts needed */
	const [_glob, selectedSong, setSelectedSong, songs, playlists, activePlaylist, setActivePlaylist,
		showAvailableLists, setShowAvailableLists,
		setSongs, setPlaylists, setTempUrl, tempUrl] = useStore((state) => {
		return [state, state.selectedSong, state.setSelectedSong, state.songs, state.playlists, state.activePlaylist, state.setActivePlaylist,
			state.showAvailableLists, state.setShowAvailableLists,
			state.setSongs, state.setPlaylists, state.setTempUrl, state.tempUrl];
	});

	// Uncomment those lines to get global state logging, also the appConfig import
	// console.log('Global state:', _glob.selectedSong);

	/* loading */
	const [loading, setLoading] = useState(false);

	const playlistsRef = firebase.firestore().collection("playlists");
	const getPlaylists = () => {
		setLoading(true);
		playlistsRef.onSnapshot((querySnapshot) => {
			const items: IPlaylist[] = [];
			querySnapshot.forEach((doc) => {
				items.push({ ...doc.data(), id: doc.id } as IPlaylist);
			});
			setPlaylists(items);
			setLoading(false);
		});
	};

	const [showDeletePlaylistPopup, setShowDeletePlaylistPopup] = useState(false);

	const deletePlaylist = (playlistName: string) => {
		setLoading(true);
		if (playlistName && playlists) {
			const playlistToDelete = playlists.find((playlist: IPlaylist) => {
				if (playlist.name === playlistName) {
					return true;
				}
				return false;
			});
			if (playlistToDelete && playlistToDelete.id !== "") {
				playlistsRef.doc(playlistToDelete.id)
					.delete()
					.then(() => {
						setActivePlaylist("");
						navigate("/song-list");
					}).then(() => {
						setLoading(false);
					})
					.catch((err: Error) => {
						console.error(err);
					});
			}
		}
	};

	const handleDeletePlaylist = (playlistName: string) => {
		setShowDeletePlaylistPopup(false);
		deletePlaylist(playlistName);
	};


	const handleAddPlaylist = (playlist: IPlaylist) => {
		setLoading(true);
		playlistsRef.add(playlist)
			.then(() => {
				navigate("/playlists");
			}).then(() => {
				setLoading(false);
			})
			.catch((err: Error) => {
				console.error(err);
			});
	};

	const handleEditPlaylist = (playlist: IPlaylist) => {
		setLoading(true);
		if (playlist.id !== "") {
			playlistsRef.doc(playlist.id)
				.update(playlist)
				.then(() => {
					setActivePlaylist(playlist.name);
					navigate(`/playlist/${stringToSlug(playlist.name)}`);
				}).then(() => {
					setLoading(false);
				})
				.catch((err: Error) => {
					console.error(err);
				});
		}
	};

	const addRemovePlaylistSong = (songName: string, playlistName: string, action: "add" | "remove") => {
		setLoading(true);
		setShowAvailableLists(false);
		if (playlistName && playlists) {
			const playlistToUpdate = playlists.find((playlist: IPlaylist) => {
				if (playlist.name === playlistName) {
					return true;
				}
				return false;
			});

			if (playlistToUpdate && playlistToUpdate.id !== "") {

				let updatedPlayList = {
					...playlistToUpdate,
					songs: [...playlistToUpdate.songs]
				};
				if (action === "add") {
					updatedPlayList = {
						...playlistToUpdate,
						songs: Array.from(new Set([...playlistToUpdate.songs, songName]))
					};
				} else if (action === "remove") {
					updatedPlayList = {
						...playlistToUpdate,
						songs: Array.from(new Set(
							[...playlistToUpdate.songs].filter((song) => { return song !== songName; })
						))
					};
				}

				return playlistsRef.doc(playlistToUpdate.id)
					.update(updatedPlayList)
					.then(() => {
						setLoading(false);
					})
					.catch((err: Error) => {
						console.error(err);
					});
			}
		}
		setLoading(false);
	};



	const songsRef = firebase.firestore().collection("songs");

	const getSongs = () => {
		setLoading(true);
		songsRef.onSnapshot((querySnapshot) => {
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
		songsRef.add(song)
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
			songsRef.doc(song.id)
				.update(song)
				.then(() => {
					setSelectedSong(song);
					navigate(`/song/${stringToSlug(song.title)}`);
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
		getPlaylists();
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

	const handleCloseSnackBar = (event?: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackBar(false);
	};


	const [showDeleteSongPopup, setShowDeleteSongPopup] = useState(false);

	const deleteSong = (song: ISong) => {
		setLoading(true);
		if (song.id !== "") {
			playlists.forEach((playlist:IPlaylist) => {
				if (playlist.id !== "") {
					const index = playlist.songs.indexOf(song.title);
					if (~index) {
						playlist.songs.splice(index, 1);
						playlistsRef.doc(playlist.id)
							.update(playlist)
							.then(() => {
								return true;
							})
							.catch((err: Error) => {
								console.error(err);
								return false;
							});
					}
				}
			});
			songsRef.doc(song.id)
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
		setShowDeleteSongPopup(false);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/* loading screen */
	if (loading) {
		return (
			<Backdrop className="backdrop" open={true} >
				<CircularProgress color="inherit" />
			</Backdrop>
		);
	}

	return (
		<React.Fragment>
			<Grid container direction="row" justifyContent="center" alignItems="center">
				<Header logout={logout} handleSearchChange={handleSearchChange} showSearch={showSearch} />
			</Grid>
			<React.Suspense fallback={<Backdrop className="backdrop" open={true} ><CircularProgress color="inherit" /></Backdrop>}>
				<Grid item xs={12}>
					<Routes>
						{user ? (
							<>
								<Route path="/" element={<Navigate to="song-list" />} />
								<Route path="/song/:title" element={
									<Song
										song={selectedSong as ISong}
										setShowDeletePopup={() => { setShowDeleteSongPopup(true); }}
									/>
								} />
								<Route path="/song-list" element={<SongList searchTerm={searchTerm} />} />
								<Route path="/new-song" element={<SongForm handleSubmit={handleAddSong} handleSuccess={handleSuccess} />} />
								<Route path="/edit-song" element={<SongForm handleSubmit={handleEditSong} handleSuccess={handleSuccess} />} />
								<Route path="/playlists" element={<Playlists />} />
								<Route path="/playlist/:listName" element={
									<>
										<Playlist
											addRemovePlaylistSong={addRemovePlaylistSong}
											handleSubmit={handleEditPlaylist} 
											handleSuccess={handleSuccess} 
										/>
										<PrintList />
									</>
								} />
								<Route path="/new-playlist" element={
									<PlaylistForm setShowDeletePlaylistPopup={setShowDeletePlaylistPopup} 
										handleSubmit={handleAddPlaylist} handleSuccess={handleSuccess} />
								} />
								<Route path="/edit-playlist" element={
									<PlaylistForm setShowDeletePlaylistPopup={setShowDeletePlaylistPopup} 
										handleSubmit={handleEditPlaylist} handleSuccess={handleSuccess} />
								} />
								<Route path="*" element={<Navigate to={tempUrl ? tempUrl : "song-list"} />} />
							</>
						) : (
							<>
								<Route path="/" element={<Navigate to="login" />} />
								<Route path="/login" element={<Login />} />
								<Route path="*" element={<Navigate to="login" />} />
							</>
						)}

					</Routes>
					{user && <SpeedDialComp />}
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
				message="Saved!"
				action={
					<React.Fragment>
						<IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackBar}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
			/>
			<Dialog
				open={showDeleteSongPopup}
				onClose={() => { setShowDeleteSongPopup(false); }}
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
					<Button onClick={() => { setShowDeleteSongPopup(false); }} color="primary">
						Cancel
					</Button>
					<Button onClick={() => { selectedSong && handleDeleteSong(selectedSong); }} color="secondary" autoFocus>
						Delete Song
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={showDeletePlaylistPopup}
				onClose={() => { setShowDeletePlaylistPopup(false); }}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this playlist?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						All of this playlist data will be FOREVER lost!!!
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => { setShowDeletePlaylistPopup(false); }} color="primary">
						Cancel
					</Button>
					<Button onClick={() => { activePlaylist && handleDeletePlaylist(activePlaylist); }} color="secondary" autoFocus>
						Delete Playlist
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={showAvailableLists}
				onClose={() => { setShowAvailableLists(false); }}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Select a list to add this song!"}</DialogTitle>
				<DialogContent>

					{(playlists && selectedSong && selectedSong.title) && playlists.map((playlist, i) => {
						return (
							<div
								className="dialog-list-item"
								key={`playlist-${i}`}
								onClick={() => { addRemovePlaylistSong(selectedSong.title, playlist.name, "add"); }}
								color="primary"
							>
								{playlist.name}
							</div>);
					})}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => { setShowAvailableLists(false); }} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default SnapshotFirebase;
