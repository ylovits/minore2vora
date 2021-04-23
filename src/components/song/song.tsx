import React from 'react';
import { ISong } from 'interfaces/interfaces';
import useStore from 'store/globalStore';
import './song.scss';

interface IProps {
	song: ISong | null;
	setShowDeletePopup: (_bool: boolean) => void;
}

const Song: React.FC<IProps> = ({ song, setShowDeletePopup }: IProps) => {
	/**
	 * Import global state parts needed
	 */
	const [goToPage, setSelectedSong] = useStore((state) => {
		return [state.goToPage, state.setSelectedSong];
	});

	const handleShowDeletePopup = (_song: ISong | null) => {
		setShowDeletePopup(true);
	};

	return (
		<div className="Song p-3">
			<div className="Song-content container">
				<div className="Song-title col-md-12 mb-2">
					<a href={song?.youtube} rel="noreferrer" target="_blank">
						<h4>{song?.title}</h4>
					</a>
				</div>
				{song?.rythm && (
					<div className="Song-section Song-rythm mb-2">
						<label>Rythm: </label>
						{song?.rythm}
					</div>
				)}
				{song?.dromos && (
					<div className="Song-section Song-dromos mb-2">
						<label>Dromos: </label>
						{song?.dromos}
					</div>
				)}
				{song?.key && (
					<div className="Song-section Song-key mb-2">
						<label>Key: </label>
						{song?.key}
					</div>
				)}
				{song?.tempo && (
					<div className="Song-section Song-tempo mb-2">
						<label>Tempo: </label>
						{song?.tempo}
					</div>
				)}
				{song?.body && <div className="Song-body col-md-12 mb-4 mt-4">{song?.body}</div>}
				{song?.notes && (
					<div className="Song-section Song-notes mb-2">
						<label>Notes: </label>
						{song?.notes}
					</div>
				)}
			</div>
			<div className="Song-footer justify-content-between align-items-center d-flex">
				<button
					className="btn btn-sm btn-primary"
					onClick={() => {
						song && setSelectedSong(song);
						goToPage('edit-song');
					}}
				>
					Edit Song
				</button>
				<button
					className="btn btn-sm btn-danger"
					onClick={() => {
						song && handleShowDeletePopup(song);
					}}
				>
					Delete Song!!
				</button>
			</div>
		</div>
	);
};

export default Song;
