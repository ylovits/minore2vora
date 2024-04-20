import React, { useEffect, useState } from "react";
import { AllKeys, AllRythms, AllScales, ISong } from "interfaces/interfaces";
import useStore from "store/globalStore";
import {
	Button, Chip, Typography, Container, Box, Drawer, FormControl, Select, MenuItem, Dialog, DialogContent, DialogActions, SelectChangeEvent
} from "@mui/material";
import { rythmoi, scales, keys } from "data/data";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { scaleToKey } from "utils/transpose";
import { useNavigate } from "react-router-dom";
import RhythmPopover from "components/rhythm-popover/RhythmPopover";
import SVGIntroducer, { Instruments } from "./svg-introducer";
import "./song.scss";
import { stringToSlug } from "utils/characterMap";

interface IProps {
	song: ISong;
	setShowDeletePopup: () => void;
}

interface SongNoInfo {
	songNo: number | null;
	previousSong: string | null;
	nextSong: string | null;
}


const Song: React.FC<IProps> = ({ song, setShowDeletePopup }: IProps) => {
	const navigate = useNavigate();

	/**
	 * Import global state parts needed
	 */
	const [setSelectedSong, setShowDrawer, showDrawer, activePlaylist, playlists] = useStore((state) => {
		return [state.setSelectedSong, state.setShowDrawer, state.showDrawer, state.activePlaylist, state.playlists];
	});



	const toggleDrawer = () => {
		setShowDrawer(!setShowDrawer);
	};

	useEffect(() => {
		setShowDrawer(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	const handleShowDeletePopup = (_song: ISong | null) => {
		setShowDeletePopup();
	};

	const [currentKey, setCurrentKey] = useState<AllKeys>();
	const [currentScale, setCurrentScale] = useState<AllScales>();
	const [songNoInfo, setSongNoInfo] = useState<SongNoInfo>({
		songNo: null,
		previousSong: null,
		nextSong: null
	});

	useEffect(() => {
		if (song && song.key) {
			setCurrentKey(scaleToKey(song.key));
			setCurrentScale(song.key);
		}
		const tempScale = scales.find((scale) => { return scale.value === song.key; });
		setTempKey({
			key: tempScale?.key as AllKeys,
			type: tempScale?.type as "major" | "minor"
		});
	}, [song, song.key]);


	const [openTranspose, setOpenTranspose] = useState(false);
	const [tempKey, setTempKey] = useState<{ key: AllKeys, type: "major" | "minor" }>({
		key: scales.find((scale) => { return scale.value === currentKey; })?.key as AllKeys,
		type: scales.find((scale) => { return scale.value === currentKey; })?.type as "major" | "minor"
	});

	const handleKeyChange = (key: AllKeys) => {
		setTempKey((oldTempKey) => {
			return {
				key: scales.find((scale) => { return scale.value === key; })?.key as AllKeys,
				type: oldTempKey.type
			};
		});
	};

	const handleClickScale = () => {
		setOpenTranspose(true);
	};

	const handleCancelTranspose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
		if (reason !== "backdropClick") {
			setOpenTranspose(false);
		}
	};

	const handleSaveTranspose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
		const tempScale = scales.find((scale) => { return scale.key === tempKey.key && scale.type === tempKey.type; })?.value as AllScales;
		setCurrentKey(tempKey.key);
		setCurrentScale(tempScale);
		if (reason !== "backdropClick") {
			setOpenTranspose(false);
		}
	};

	const [selectedInstrument, _setSelectedInstrument] = useState<Instruments>(Instruments._guitar);

	useEffect(() => {
		let songNo = null;
		if (playlists) {
			const pl = playlists.find((pl) => {
				return pl.name === activePlaylist;
			});

			if (pl) {
				songNo = pl.songs?.findIndex((sng) => { return sng === song.title; }) + 1 || null;
				if (songNo) {
					setSongNoInfo({
						songNo,
						previousSong: pl.songs[songNo - 2] || null,
						nextSong: pl.songs[songNo] || null,
					});
				}
			}
		}
	}, [song]);

	return (
		<div className="Song">
			<Container maxWidth="md">
				<Typography variant="h6" component="h1" className="title" >
					{(songNoInfo.songNo && !!songNoInfo.previousSong) && <Chip
						className="chip"
						color="secondary"
						size="small"
						label={"<"}
						onClick={() => {
							navigate(`/song/${stringToSlug(songNoInfo.previousSong || "")}`);
						}}
					/>}
					{songNoInfo.songNo && <Chip
						className="chip"
						color="primary"
						size="small"
						label={songNoInfo.songNo}
					/>}
					<a href={song?.youtube ? song?.youtube : "#"} rel="noreferrer" target={song?.youtube ? "_blank" : "_self"} className="titleLink">
						{song?.title}
					</a>
					{(songNoInfo.songNo && !!songNoInfo.nextSong) && <Chip
						className="chip"
						color="secondary"
						size="small"
						label={">"}
						onClick={() => {
							navigate(`/song/${stringToSlug(songNoInfo.nextSong || "")}`);
						}}
					/>}
				</Typography>

				{(song.rhythm && song.rhythm.length > 0) && (
					<Box className="inline">
						<label>Rhythm: </label>
						{song.rhythm.map((rhythm) => {
							const currentRhythmDescription: AllRythms = rythmoi.find((rythmObj) => {
								return rythmObj.label === rhythm;
							})?.value.rhythm as AllRythms ?? "";
							return <RhythmPopover key={`${song.id}-${rhythm}`} rhythmName={rhythm} rhythmDesription={currentRhythmDescription} />;
						})}
					</Box>
				)}
				{(song.dromos && song.dromos.length > 0) && (
					<Box className="inline">
						<label>Dromos: </label>
						{song?.dromos.map((dromos) => {
							return <Chip className="chip" key={`${song.id}-${dromos}`} color="primary" size="small" label={dromos} />;
						})}
					</Box>
				)}
				{song.key && (
					<Box className="inline">
						<label>Key: </label>
						<Chip
							className="chip"
							color="secondary"
							size="small"
							label={currentScale || song.key}
							onClick={handleClickScale}
						/>
						<Dialog disableEscapeKeyDown open={openTranspose} onClose={handleCancelTranspose}>
							<DialogContent>
								<Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
									<FormControl variant="standard">
										<Select
											value={tempKey.key}
											onChange={(selection: SelectChangeEvent) => {
												handleKeyChange(selection.target.value as AllKeys);
											}}
										>
											{keys.map((key) => {
												return (
													<MenuItem key={key.label} value={key.label}>{key.label}</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								</Box>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleCancelTranspose}>Cancel</Button>
								<Button onClick={handleSaveTranspose}>Ok</Button>
							</DialogActions>
						</Dialog>
					</Box>
				)}
				{(song.tempo && song.tempo > 1) && (
					<Box className="inline">
						<label>Tempo: </label>
						<Chip className="chip" variant="outlined" color="primary" size="small" label={song.tempo} />
					</Box>
				)}
				{song.notes && (
					<Box className="notes">
						<label>Notes: </label>
						{song.notes}
					</Box>
				)}
				{song?.body &&
					<div className="mainContent SongBody" >
						<SVGIntroducer song={song} selectedInstrument={selectedInstrument} currentKey={currentKey} />
					</div>
				}
			</Container>
			<Drawer anchor='bottom' open={showDrawer} onClose={toggleDrawer}>
				<Button
					className="btn"
					onClick={() => {
						song && setSelectedSong(song);
						navigate("/edit-song");
					}}
					variant="contained"
					color="primary"
					startIcon={<EditIcon />}
				>Edit Song</Button>
				<Button
					className="btn"
					onClick={() => {
						song && handleShowDeletePopup(song);
					}}
					variant="contained"
					color="secondary"
					startIcon={<DeleteIcon />}
				>Delete Song!!</Button>
			</Drawer>
		</div>
	);
};

export default Song;
