import React, { useEffect, useState } from "react";
import { IPlaylist } from "interfaces/interfaces";
import { stringToSlug } from "utils/characterMap";
import useStore from "store/globalStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Paper, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import "../playlists.scss";

interface IProps {
	addRemovePlaylistSong: (_songName: string, _playlistName: string, _action: "add" | "remove") => void;
	handleSubmit: (_sng: IPlaylist) => void;
	handleSuccess: () => void;
}


const Playlist: React.FC<IProps> = ({ addRemovePlaylistSong, handleSubmit, handleSuccess }: IProps) => {
	const location = useLocation();
	const navigate = useNavigate();

	/**
	 * Import global state parts needed
	 */
	const [playlists, setActivePlaylist, activePlaylist] = useStore((state) => {
		return [state.playlists, state.setActivePlaylist, state.activePlaylist];
	});

	const [playlist, setPlaylist] = useState<IPlaylist>({
		id: "",
		name: "",
		songs: []
	});

	useEffect(() => {
		if (playlists) {
			const currentPlaylist = playlists.find((playlistItem: IPlaylist) => {
				if (location.pathname.endsWith(stringToSlug(playlistItem.name))) {
					setActivePlaylist(playlistItem.name);
					return true;
				}
				return false;
			});
			currentPlaylist && setPlaylist(currentPlaylist);
		} 
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [orderChanged, _setOrderChanged] = useState(true);

	return (
		<>
			<div className="Playlists">
				{playlist && playlist.songs
					.map((songTitle) => {
						return (
							<Paper
								className="paper"
								key={`song-${songTitle}`}
								onClick={() => {
									navigate(`/song/${stringToSlug(songTitle)}`);
								}}>
								<Grid container wrap="nowrap">
									<Grid className="wrapper" item>
										<p className="title">{songTitle}</p>
										<button
											className="remove-song"
											onClick={(e) => {
												e.stopPropagation();
												addRemovePlaylistSong(songTitle, activePlaylist, "remove");
											}}
										>
											X
										</button>
									</Grid>
								</Grid>
							</Paper>
						);
					})}
			</div>
			{(orderChanged && playlist) && (
				<Button
					style={{ margin: "0.5rem 0" }}
					name="save"
					onClick={() => {
						handleSuccess();
						return handleSubmit(playlist);
					}}
					variant="contained"
					color="primary"
					className="saveOrder"
				>
					Save Changes
				</Button>
			)}
		</>
	);
};

export default Playlist;
