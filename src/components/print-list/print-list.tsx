import React, { useEffect, useState } from "react";
import { IPlaylist, ISong } from "interfaces/interfaces";
import { stringToSlug } from "utils/characterMap";
import { useLocation } from "react-router-dom";
import useStore from "store/globalStore";
import Song from "components/song/song";
import "./print-list.scss";

const PrintList = () => {
	const location = useLocation();


	/**
	 * Import global state parts needed
	 */
	const [playlists, setActivePlaylist, songs] = useStore((state) => {
		return [state.playlists, state.setActivePlaylist, state.songs];
	});

	const [playlist, setPlaylist] = useState<IPlaylist>({
		id: "",
		name: "",
		songs: []
	});

	useEffect(() => {

		if (playlists) {
			const currentPlaylist = playlists.find((playlistItem: IPlaylist) => {
				if (location.pathname.includes(stringToSlug(playlistItem.name))) {
					setActivePlaylist(playlistItem.name);
					return true;
				}
				return false;
			});
			currentPlaylist && setPlaylist(currentPlaylist);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!playlist) {
		return <div>No playlist to print</div>;
	}

	return (
		<div className="PrintList">
			<h1 className="playlistName">{playlist.name}</h1>
			<ul className="contents">
				{playlist.songs && playlist.songs.map((songName, i) => {
					return (
						<li className="song" key={`song-content-${i}`}>
							<p className="name">{songName}</p>
							<span className="dots"></span>
							<span className="page">{i + 1}</span>
						</li>
					);
				})}
			</ul>
			{playlist.songs && playlist.songs.map((songName, i) => {
				const selectedSong = songs.find((song) => { return song.title === songName; });
				if (selectedSong) {
					return (
						<div className="songPage" key={`song-content-${i}`}>
							<Song 
								song={selectedSong as ISong}
								setShowDeletePopup={() => { return; }}
							/>
							<span className="pageNo">{i + 1}</span>
						</div>
					);
				}
			})}
		</div>
	);
};

export default PrintList;