import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { ISong } from '../interfaces/interfaces';

const GetFirebase = () => {
	const [songs, setSongs] = useState<ISong[]>([]);
	const [loading, setLoading] = useState(false);

	const ref = firebase.firestore().collection('songs');

	const getSongs = () => {
		setLoading(true);
		ref.get().then((item) => {
			const items: any[] = item.docs.map((doc) => { return { id: doc.id, ...doc.data() };});
			setSongs(items);
			setLoading(false);
		});
	};

	useEffect(() => {
		getSongs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const logout = () => {
		firebase.auth().signOut();
	};
	
	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="App">
			<h1>Songs</h1>
			<button onClick={()=>{return logout();}}>Logout</button>
			{songs.map((song) => {
				return (
					<div key={`song-${song.title}`}>
						<h1>{song.title}</h1>
					</div>
				);
			})}
		</div>
	);
};

export default GetFirebase;
