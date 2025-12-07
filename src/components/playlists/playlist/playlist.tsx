import React, { useEffect, useState } from "react";
import { IPlaylist } from "interfaces/interfaces";
import { stringToSlug } from "utils/characterMap";
import useStore from "store/globalStore";
import { useLocation, useNavigate } from "react-router-dom";
import { Paper, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import "../playlists.scss";

interface IProps {
	addRemovePlaylistSong: (_songName: string, _playlistName: string, _action: "add" | "remove") => void;
	handleSubmit: (_sng: IPlaylist) => void;
	handleSuccess: () => void;
}

interface SortableItemProps {
	id: string;
	songTitle: string;
	index: number;
	activePlaylist: string;
	addRemovePlaylistSong: (_songName: string, _playlistName: string, _action: "add" | "remove") => void;
	navigate: (_path: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, songTitle, index, activePlaylist, addRemovePlaylistSong, navigate }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		boxShadow: isDragging ? "0 0 .4rem #666" : "none",
	};

	return (
		<Paper
			ref={setNodeRef}
			style={style}
			className="paper"
			onClick={() => {
				navigate(`/song/${stringToSlug(songTitle)}`);
			}}
		>
			<Grid container wrap="nowrap">
				<Grid className="wrapper">
					<div className="dragHandle" {...attributes} {...listeners}>
						<DragHandleIcon />
					</div>
					<div className="numbering">{index + 1}</div>
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
};

const Playlist: React.FC<IProps> = ({ addRemovePlaylistSong, handleSubmit, handleSuccess }: IProps) => {
	const location = useLocation();
	const navigate = useNavigate();

	/**
	 * Import global state parts needed
	 */
	const playlists = useStore((state) => { return state.playlists; });
	const setActivePlaylist = useStore((state) => { return state.setActivePlaylist; });
	const activePlaylist = useStore((state) => { return state.activePlaylist; });

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
	}, [playlists, location.pathname]);

	const [orderChanged, setOrderChanged] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			setPlaylist((prevPlaylist) => {
				const oldIndex = prevPlaylist.songs.indexOf(active.id as string);
				const newIndex = prevPlaylist.songs.indexOf(over.id as string);
				const newSongs = arrayMove(prevPlaylist.songs, oldIndex, newIndex);
				setOrderChanged(true);
				return { ...prevPlaylist, songs: newSongs };
			});
		}
	};

	return (
		<>
			<div className="Playlists">
				{playlist && playlist.songs && (
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<div className="ListContainer">
							<h1>{playlist.name}</h1>
							<SortableContext
								items={playlist.songs}
								strategy={verticalListSortingStrategy}
							>
								{playlist.songs.map((songTitle, i) => {
									return (
										<SortableItem
											key={songTitle}
											id={songTitle}
											songTitle={songTitle}
											index={i}
											activePlaylist={activePlaylist}
											addRemovePlaylistSong={addRemovePlaylistSong}
											navigate={navigate}
										/>
									);
								})}
							</SortableContext>
						</div>
					</DndContext>
				)}
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
