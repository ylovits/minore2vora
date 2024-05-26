import React, { useEffect, useState } from "react";
import { IPlaylist } from "interfaces/interfaces";
import { stringToSlug } from "utils/characterMap";
import useStore from "store/globalStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Paper, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragHandleIcon from "@mui/icons-material/DragHandle";
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

	const [orderChanged, setOrderChanged] = useState(false);

	const updated = () => {
		setOrderChanged(true);
	};

	return (
		<>
			<div className="Playlists">
				{playlist && <DragDropContext
					onDragEnd={(param) => {
						const srcI = param.source.index;
						const desI = param.destination?.index;
						if (desI) {
							playlist.songs.splice(desI, 0, playlist.songs.splice(srcI, 1)[0]);
							updated();
						}
					}}
				>
					<div className="ListContainer">
						<h1>{playlist.name}</h1>
						<Droppable droppableId="droppable-1">
							{(provided, _) => { 
								return (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										{playlist.songs
											.map((songTitle, i) => {
												return (
													<Draggable
														key={songTitle}
														draggableId={"draggable-" + songTitle}
														index={i}
													>
														{(provided, snapshot) => {

															return (
																<Paper
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	style={{
																		...provided.draggableProps.style,
																		boxShadow: snapshot.isDragging
																			? "0 0 .4rem #666"
																			: "none",
																	}}
																	className="paper"
																	key={`song-${songTitle}-${i}`}
																	onClick={() => {
																		navigate(`/song/${stringToSlug(songTitle)}`);
																	}}>
																	<Grid container wrap="nowrap">
																		<Grid className="wrapper" item>
																			<div className="dragHandle" {...provided.dragHandleProps}>
																				<DragHandleIcon />
																			</div>
																			<div className="numbering">{i + 1}</div>
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
														}}
													</Draggable>
												);
											})}
										{provided.placeholder}
									</div>
								); 
							}}
						</Droppable>
					</div>
				</DragDropContext>}
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
					color="secondary"
					className="saveOrder"
				>
					Save Changes
				</Button>
			)}
		</>
	);
};

export default Playlist;
