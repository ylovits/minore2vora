import React, { useState, useEffect, lazy } from 'react';
import firebase from '../../firebase';
import { ISong } from '../../interfaces/interfaces';
import useStore from 'store/globalStore';
import Header from 'components/layout/header';

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
	const [_glob, page, selectedSong] = useStore((state) => {
		return [state, state.page, state.selectedSong];
	});

	// Uncomment those lines to get global state logging, also the appConfig import
	// console.log('Global state:', _glob);

	const [songs, setSongs] = useState<ISong[]>([]);
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

	const _addSong = (song: ISong) => {
		ref.add(song).catch((err: Error) => {
			console.error(err);
		});
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

	const _editSong = (song: ISong) => {
		if (song.id !== '') {
			ref.doc(song.id)
				.update(song)
				.catch((err: Error) => {
					console.error(err);
				});
		}
	};

	useEffect(() => {
		getSongs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddSong = (song: ISong) => {
		console.log(song);
		// addSong(song);
	};

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
			return <SongList
				songs={songs}
			/>;
		case 'song':
			return <Song
				song={selectedSong}
				setShowDeletePopup={setShowDeletePopup}
			/>;	
		case 'new-song':
			return <SongForm 
				handleSubmit={handleAddSong} 
			/>;	
		case 'edit-song':
			return <SongForm 
				handleSubmit={handleAddSong} 
			/>;	
		} 

	};
	
	if (loading) {
		return <h1>Loading...</h1>;
	}



	return (
		<React.Fragment>
			<Header logout={logout} />
			{showDeletePopup && (
				// pass toggleShowDeletePpup={toggleShowDeletePpup} to close popup
				<p>Delete popup here</p>
			)}
			<React.Suspense fallback={<h1>Loading...</h1>}>
				{renderPages(page)}
			</React.Suspense>
		</React.Fragment>
	);
};

export default SnapshotFirebase;
