import React, { useState, useEffect, lazy } from 'react';
import firebase from '../../firebase';
import { ISong } from '../../interfaces/interfaces';
import CreateSong from 'components/form/create-song';
import useStore from 'store/globalStore';


/**
 * Lazy load all "page" components for code splitting
 */
const SongList = lazy(() => {
	return import('components/song-list/song-list');
});

const SnapshotFirebase: React.FC = () => {
	/**
	 * Import global state parts needed
	 */
	const [_glob, page] = useStore((state) => {
		return [state, state.page];
	});

	// Uncomment those lines to get global state logging, also the appConfig import
	console.log('Global state:', _glob);

	const [songs, setSongs] = useState<ISong[]>([]);
	const [loading, setLoading] = useState(false);
	const [showNewSong, setShowNewSong] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [songToEdit, setSongToEdit] = useState<ISong | null>(null);
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
			setShowNewSong(true);
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
				setShowNewSong={setShowNewSong}
				setShowDeletePopup={setShowDeletePopup}
				setSongToEdit={setSongToEdit} 
			/>;
		} 
	};
	
	if (loading) {
		return <h1>Loading...</h1>;
	}



	return (
		<React.Fragment>
			<div className="Header d-flex justify-content-between align-items-center p-2">
				<h1 className="h3">Μινόρε του Βορρά</h1>
				<button
					className="btn btn-sm btn-secondary m-2"
					onClick={() => {
						return logout();
					}}
				>
					Logout
				</button>
			</div>
			{showNewSong && <CreateSong handleSubmit={handleAddSong} songToEdit={null} />}
			{songToEdit && <CreateSong handleSubmit={handleAddSong} songToEdit={songToEdit} />}
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
