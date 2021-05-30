import React, { useState, useEffect, lazy } from 'react';
import firebase from '../../firebase';
import { ISong } from '../../interfaces/interfaces';
import useStore from 'store/globalStore';
import Header from 'components/layout/header';
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
} from '@material-ui/core';




import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';


/* Styles */
const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		backdrop: {
			zIndex: theme.zIndex.drawer + 1,
			color: '#fff',
		},
	});
});


/* Lazy load all "page" components for code splitting */
const SongList = lazy(() => { 
	return import('components/song-list/song-list');
});
const Song = lazy(() => {
	return import('components/song/song');
});
const SongForm = lazy(() => {
	return import('components/song-form/song-form');
});


const SnapshotFirebase: React.FC = () => {

	/* load styles */
	const classes = useStyles();
	
	/* Import global state parts needed */
	const [_glob, page, selectedSong, setSongs, goToPage] = useStore((state) => {
		return [state, state.page, state.selectedSong, state.setSongs, state.goToPage];
	});

	// Uncomment those lines to get global state logging, also the appConfig import
	// console.log('Global state:', _glob.songs);

	/* loading */ 
	const [loading, setLoading] = useState(false);


	const ref = firebase.firestore().collection('songs');

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
				goToPage('song-list');
			}).then(() => {
				setLoading(false);
			})
			.catch((err: Error) => {
				console.error(err);
			});
	};

	const handleEditSong = (song: ISong) => {
		setLoading(true);
		if (song.id !== '') {
			ref.doc(song.id)
				.update(song)
				.then(() => {
					goToPage('song-list');
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
		if (reason === 'clickaway') {
			return;
		}
		
		setOpenSnackBar(false);
	};


	const [showDeletePopup, setShowDeletePopup] = useState(false);

	const deleteSong = (song: ISong) => {
		setLoading(true);
		if (song.id !== '') {
			ref.doc(song.id)
				.delete()
				.then(() => {
					goToPage('song-list');
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
	const [searchTerm, setSearchTerm] = useState('');
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const renderPages = (page: string) => {
		switch (page) {
		case 'song-list':
			return <SongList searchTerm={searchTerm}/>;
		case 'song':
			return <Song song={selectedSong} setShowDeletePopup={() => { setShowDeletePopup (true);}} />;
		case 'new-song':
			return <SongForm handleSubmit={handleAddSong} handleSuccess={handleSuccess} />;
		case 'edit-song':
			return <SongForm handleSubmit={handleEditSong} handleSuccess={handleSuccess} />;
		}
	};



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
			<Grid container direction="row" justify="center" alignItems="center">
				<Header logout={logout} handleSearchChange={handleSearchChange}/>
			</Grid>
			<React.Suspense fallback={<Backdrop className={classes.backdrop} open={true} ><CircularProgress color="inherit" /></Backdrop>}>
				<Grid item xs={12}>
					{renderPages(page)}
				</Grid>
			</React.Suspense>

			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
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
				<DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this song?'}</DialogTitle>
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
