import React, { useState, useEffect, ChangeEvent } from "react";
import useStore from "store/globalStore";
import { IPlaylist, ISong } from "interfaces/interfaces";
import Button from "@mui/material/Button";
import {
	Container, TextField,
	Checkbox,
	FormControl,
	FormGroup,
	FormControlLabel
} from "@mui/material";
import "./playlist-form.scss";
interface IProps {
	handleSubmit: (_sng: IPlaylist) => void;
	setShowDeletePlaylistPopup: (_bool: boolean) => void;
	handleSuccess: () => void;
}

const PlaylistForm: React.FC<IProps> = ({ handleSubmit, handleSuccess, setShowDeletePlaylistPopup }: IProps) => {

	/**
	 * Import global state parts needed
	 */
	const activePlaylist = useStore((state) => { return state.activePlaylist; });
	const playlists = useStore((state) => { return state.playlists; });
	const songs = useStore((state) => { return state.songs; });

	const [playlist, setPlaylist] = useState<IPlaylist>({
		id: "",
		name: "",
		songs: []
	});

	useEffect(() => {
		if (activePlaylist !== null && playlists) {
			const playlistToDelete = playlists.find((playlist: IPlaylist) => {
				if (playlist.name === activePlaylist) {
					return true;
				}
				return false;
			});
			if (playlistToDelete) {
				setPlaylist(playlistToDelete);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
		if (event && event.target && event.target.value) {
			if (checked) {
				setPlaylist((playlist) => {
					if (!!playlist.songs.length) {
						return {
							...playlist,
							songs: Array.from(new Set([...playlist.songs, event.target.value]))
						};
					}
					return {
						...playlist,
						songs: [event.target.value]
					};
				});
			} else {
				setPlaylist((playlist) => {
					if (!!playlist.songs.length) {
						return {
							...playlist,
							songs: playlist.songs.filter((song) => {
								return song !== event.target.value;
							})
						};
					}
					return {
						...playlist,
						songs:[]
					};
				});
			}
		}
	};


	return (
		<div className="PlaylistForm">
			<Container maxWidth="md" className="container">
				<TextField
					id="name"
					label="Όνομα"
					style={{ margin: "0.5rem 0" }}
					placeholder="Όνομα"
					fullWidth
					margin="normal"
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					onChange={(e) => {
						setPlaylist((playlist) => {
							return { ...playlist, name: e.target.value };
						});
					}}
					value={playlist.name}
					autoComplete="off"
					required
				/>

				<FormControl
					className="formControl"
					component="fieldset"
					fullWidth
				>
					<FormGroup aria-label="Songs" row={true}>
						{(playlists && songs && activePlaylist) && songs
							.sort((a: ISong, b: ISong) => {
								return ("" + a.title).localeCompare(b.title);
							})
							.map((song, i) => {
								if (playlist.songs) {
									return (
										<FormControlLabel
											className="song-option"
											key={song.title + i}
											value={song.title}
											color="primary"
											control={
												<Checkbox
													onChange={handleChange}
													checked={playlist.songs.includes(song.title)}
												/>
											}
											label={song.title}
										/>
									);
								}
								return null;
							})}
					</FormGroup>
				</FormControl>
				<div className="form-group row">
					<div className="offset-2 col-md-10">
						<Button
							style={{ margin: "0.5rem 0" }}
							name="submit"
							type="submit"
							onClick={() => {
								handleSuccess();
								return handleSubmit(playlist);
							}}
							variant="contained"
							color="primary"
						>
							Submit
						</Button>
						<Button
							style={{ margin: "0.5rem 1rem" }}
							name="delete"
							onClick={() => {
								setShowDeletePlaylistPopup(true);
							}}
							variant="contained"
							color="error"
						>
							Delete Playlist
						</Button>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default PlaylistForm;
