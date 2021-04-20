import React from 'react';
import { ISong } from 'interfaces/interfaces';

interface IProps {
	songs: ISong[];
	setShowNewSong: (_bool: boolean) => void;
	setShowDeletePopup: (_bool: boolean) => void;
	setSongToEdit: (_song: ISong | null) => void;
}

const SongList: React.FC<IProps> = ({ songs, setShowNewSong, setShowDeletePopup, setSongToEdit }: IProps) => {
	const handleShowDeletePopup = (_song: ISong) => {
		setShowDeletePopup(true);
	};

	return (
		<div className="SongList p-2">
			{songs.map((song) => {
				return (
					<div
						className="p-2 m-2 row border song d-flex justify-content-between align-items-center"
						key={`song-${song.title}`}
					>
						<p className="flex-grow-1">{song.title}</p>
						<button
							className="btn btn-sm btn-primary m-2"
							onClick={() => {
								setShowNewSong(false);
								setSongToEdit(song);
							}}
						>
							Edit Song
						</button>
						<button
							className="btn btn-sm btn-danger m-2"
							onClick={() => {
								return handleShowDeletePopup(song);
							}}
						>
							Delete!!
						</button>
					</div>
				);
			})}
			<div className="m-2 row">
				<button
					className="btn btn-block btn-success m-2"
					onClick={() => {
						setSongToEdit(null);
						setShowNewSong(true);
					}}
				>
					Add song
				</button>
			</div>
		</div>
	);
};

export default SongList;
