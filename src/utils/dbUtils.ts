import { IPlaylist } from "interfaces/interfaces";
import firebase from "../firebase";

const playlistsRef = firebase.firestore().collection("playlists");

export const updateSongLinks = (
	playlists: IPlaylist[],
	oldTitle: string,
	action: "renamed" | "deleted",
	newTitle?: string
) => {
	return playlists.forEach((playlist:IPlaylist) => {
		if (playlist.id !== "") {
			const index = playlist.songs.indexOf(oldTitle);
			if (~index) {
				if (action === "renamed" && newTitle) {
					playlist.songs[index] = newTitle;
				} else if (action === "deleted") {
					playlist.songs.splice(index, 1);
				}
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
		return false;
	});
};