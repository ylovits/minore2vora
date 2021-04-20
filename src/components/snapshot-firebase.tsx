import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { ISong } from "../interfaces/interfaces";
import CreateSong from "./form/create-song";


const SnapshotFirebase = () => {
	const [songs, setSongs] = useState<ISong[]>([]);
	const [loading, setLoading] = useState(false);
	const [showNewSong, setShowNewSong] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [songToEdit, setSongToEdit] = useState<ISong | null>(null);

	const ref = firebase.firestore().collection("songs");

	const getSongs = () => {
		setLoading(true);
		ref.onSnapshot((querySnapshot) => {
			const items: any[] = [];
			querySnapshot.forEach((doc) => {
				items.push({ id: doc.id, ...doc.data() });
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

	const deleteSong = (song: ISong) => {
		if (song.id !== "") {
			ref.doc(song.id)
				.delete()
				.catch((err: Error) => {
					console.error(err);
				});
		}
	};

	const editSong = (song: ISong) => {
		if (song.id !== "") {
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

	const logout = () => {
		firebase.auth().signOut();
	};

	const handleAddSong = (song: ISong) => {
		console.log(song);
		// addSong(song);
	}

	const handleShowDeletePopup =(song: ISong) => {
		setShowDeletePopup(true);
	}

	const toggleShowDeletePpup = () => {
		setShowDeletePopup((show) => { return !show})
	}

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<React.Fragment>
			<div className="App">
				<h1 className="h3">Songs</h1>
				<button className="btn btn-secondary m-2" onClick={() => logout()}>Logout</button>
				{songs.map((song) => (
					<div className="p-2 m-2 row border song d-flex justify-content-between align-items-center" key={`song-${song.title}`}>
						<h3 className="flex-grow-1">{song.title}</h3>
						<button className="btn btn-primary m-2" onClick={() => {
							setShowNewSong(false);
							setSongToEdit(song)}
						}>Edit Song</button>
						<button className="btn btn-danger m-2" onClick={() => handleShowDeletePopup(song)}>Delete!!</button>
					</div>
				))}
			</div>
			<button className="btn btn-success m-2"
				onClick={() => {
					setSongToEdit(null);
					setShowNewSong(true);
				}}
			>
				+
			</button>
			{songToEdit && (
				<CreateSong handleSubmit={handleAddSong} songToEdit={songToEdit}/>
			)}
			{showNewSong && (
				<CreateSong handleSubmit={handleAddSong} songToEdit={null}/>
			)}
			{showDeletePopup &&
				// pass toggleShowDeletePpup={toggleShowDeletePpup} to close popup
				<p>Delete popup here</p>
			}
		</React.Fragment>
	);
};

export default SnapshotFirebase;

					