import React, { useState, useEffect, lazy } from 'react';
import firebase from '../../firebase';
import { ISong } from '../../interfaces/interfaces';
import useStore from 'store/globalStore';
import Header from 'components/layout/header';
import Grid from '@material-ui/core/Grid';

/**
 * Lazy load all "page" components for code splitting
 */
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
	/**
	 * Import global state parts needed
	 */
	const [_glob, page, selectedSong, setSongs] = useStore((state) => {
		return [state, state.page, state.selectedSong, state.setSongs];
	});

	// Uncomment those lines to get global state logging, also the appConfig import
	// console.log('Global state:', _glob);

	const [loading, setLoading] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const ref = firebase.firestore().collection('songs');

	const getSongs = () => {
		setLoading(true);
		ref.onSnapshot((querySnapshot) => {
			const items: ISong[] = [];
			querySnapshot.forEach((doc) => {
				items.push({ id: doc.id, ...doc.data() } as ISong);
			});
			setSongs(items);
			setLoading(false);
		});
	};

	const addSong = (song: ISong) => {
		ref.add(song).catch((err: Error) => {
			console.error(err);
		});
	};
	const handleAddSong = (song: ISong) => {
		addSong(song);
	};

	const _deleteSong = (song: ISong) => {
		if (song.id !== '') {
			ref.doc(song.id)
				.delete()
				.catch((err: Error) => {
					console.error(err);
				});
		}
	};

	const editSong = (song: ISong) => {
		if (song.id !== '') {
			ref.doc(song.id)
				.update(song)
				.catch((err: Error) => {
					console.error(err);
				});
		}
	};
	const handleEditSong = (song: ISong) => {
		editSong(song);
	};

	useEffect(() => {
		getSongs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const _toggleShowDeletePpup = () => {
		setShowDeletePopup((show) => {
			return !show;
		});
	};

	const logout = () => {
		firebase.auth().signOut();
	};

	const renderPages = (page: string) => {
		switch (page) {
		case 'song-list':
			return <SongList />;
		case 'song':
			return <Song song={selectedSong} setShowDeletePopup={setShowDeletePopup} />;
		case 'new-song':
			return <SongForm handleSubmit={handleAddSong} />;
		case 'edit-song':
			return <SongForm handleSubmit={handleEditSong} />;
		}
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<React.Fragment>
			<Grid container direction="row" justify="center" alignItems="center">
				<Header logout={logout} />
			</Grid>
			{showDeletePopup && (
				// pass toggleShowDeletePpup={toggleShowDeletePpup} to close popup
				<p>Delete popup here</p>
			)}
			<React.Suspense fallback={<h1>Loading...</h1>}>
				<Grid item xs={12}>
					{renderPages(page)}
				</Grid>
			</React.Suspense>
		</React.Fragment>
	);
};

export default SnapshotFirebase;
