import React from 'react';
import { ISong } from 'interfaces/interfaces';
import useStore from 'store/globalStore';
import './song-list.scss';

interface IProps {
	songs: ISong[];
}

const SongList: React.FC<IProps> = ({ songs }: IProps) => {

	/**
	 * Import global state parts needed
	 */
	const [goToPage, setSelectedSong] = useStore((state) => {
		return [state.goToPage, state.setSelectedSong];
	});

	return (
		<div className="SongList p-2">
			{songs.map((song) => {
				return (
					<div
						className="p-2 m-2 row border song d-flex justify-content-between align-items-center pointer text-center"
						key={`song-${song.title}`}
						onClick={() => { 
							setSelectedSong(song);
							goToPage('song');
						}}
					>
						<p className="flex-grow-1 font-weight-bold p-2 m-0">{song.title}</p>

					</div>
				);
			})}
			<div className="m-2 row">
				<button
					className="btn btn-block btn-success mt-2"
					onClick={() => {
						setSelectedSong(null);
						goToPage('new-song');
					}}
				>
					Add song
				</button>
			</div>
		</div>
	);
};

export default SongList;
