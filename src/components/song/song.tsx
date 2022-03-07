import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { AllKeys, AllRythms, AllScales, ISong } from "interfaces/interfaces";
import useStore from "store/globalStore";
import { 
	Button, Chip, Typography, Container, Box,  Drawer, FormControl, Select, MenuItem, Dialog, DialogContent, DialogActions 
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { rythmoi, scales, keys } from "data/data";
import FabMenu from "components/ui/fab-menu";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { scaleToKey, transposeChord } from "utils/transpose";
import { crossLangSafeguard } from "utils/characterMap";
import { useNavigate } from "react-router-dom";
import RhythmPopover from "components/rhythm-popover/RhythmPopover";
// import ChordSVG from "components/song/ChordSVG";
import "./song.scss";

interface IProps {
	song: ISong;
	setShowDeletePopup: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		root: {
			display: "flex",
			flexDirection: "column",
			paddingBottom: theme.spacing(5),
		},
		chips: {
			display: "flex",
			justifyContent: "center",
			flexWrap: "wrap",
			listStyle: "none",
			padding: theme.spacing(0.5),
			margin: 0,
		},
		chip: {
			margin: theme.spacing(0.5),
		},
		clickable: {
			cursor: "pointer",
		},
		titleLink: {
			textDecoration: "none",
			color: theme.palette.primary.main,		
		},
		title: {
			margin: theme.spacing(2, 0),
		},
		inline: {
			margin: "0.5rem 0.5rem 0 0",
			display: "inline-block",
		},
		notes: {
			margin: "0.5rem 0.5rem 0 0",
			display: "block",
			fontStyle: "italic",
			fontSize: "0.8rem;",
			color: "#aaa"
		},
		popPad: {
			padding: theme.spacing(2),
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		mainContent: {
			padding: theme.spacing(2, 0),
			whiteSpace: "pre-line",
		},
		btn: {
			borderRadius: 0,
			padding: theme.spacing(3, 0),
		}
	});
});




const Song: React.FC<IProps> = ({ song, setShowDeletePopup }: IProps) => {
	const navigate = useNavigate();
	const classes = useStyles();

	/**
	 * Import global state parts needed
	 */
	const [setSelectedSong] = useStore((state) => {
		return [state.setSelectedSong];
	});

	const handleShowDeletePopup = (_song: ISong | null) => {
		setShowDeletePopup();
	};


	const [showDrawer, setShowDrawer] = useState(false);
	const toggleDrawer = () => {
		setShowDrawer((show) => { return !show; });
	};

	const strongRef = useRef<HTMLElement>(null);

	const [currentKey, setCurrentKey] = useState<AllKeys>();
	const [currentScale, setCurrentScale] = useState<AllScales>();
	
	useEffect(() => {
		if (strongRef.current && song.key) {
			if (currentKey) {
				strongRef.current.innerHTML = (song.body as string).replace(
					/\[\[(.*?)\]\]/g,
					(_match, text, _offset, _string) => { 
						return `<strong>${transposeChord(
							crossLangSafeguard(text), song.key, currentKey
						)}</strong>`; 
					}
				).replace(
					/\{\{(.*?)\}\}/g,
					(_match, text, _offset, _string) => { 
						return `<em>${transposeChord(
							crossLangSafeguard(text), song.key, currentKey 
						)}</em>`; 
					}
				).replace(
					/\%\%(.*?)\%\%/g,
					(_match, text, _offset, _string) => { 
						return `<span class=\"perasma\">${transposeChord(
							crossLangSafeguard(text), song.key, currentKey 
						)}</span>`; 
					}
				);
			} else {
				strongRef.current.innerHTML = (song.body as string).replace(
					/\[\[(.*?)\]\]/g,
					"<strong>$1</strong>"
				).replace(
					/\{\{(.*?)\}\}/g,
					"<em>$1</em>"
				).replace(
					/\%\%(.*?)\%\%/g,
					"<span class=\"perasma\">$1</span>"
				);
			}
		}
	}, [currentKey, song, song.body, strongRef]);



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
	const [tempKey, setTempKey] = useState<{key: AllKeys, type: "major" | "minor"}>({ 
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

	return (
		<div className={classes.root}>
			<Container maxWidth="md">
				<a href={song?.youtube ? song?.youtube : "#"} rel="noreferrer" target={song?.youtube ? "_blank" : "_self"} className={classes.titleLink}>
					<Typography variant="h6" component="h1" className={classes.title} >
						{song?.title}
					</Typography>
				</a>
				{/* <ChordSVG/> */}
				{(song.rhythm && song.rhythm.length > 0) && (
					<Box className={classes.inline}>
						<label>Rhythm: </label>
						{song.rhythm.map((rhythm) => {
							const currentRhythm:AllRythms = rythmoi.find((rythmObj) => {
								return rythmObj.label === rhythm;
							})?.value.rhythm as AllRythms ?? "";
							return <RhythmPopover key={`${song.id}-${rhythm}`} rhythmName={rhythm} rhythmDesription={currentRhythm}/>;
						})}
					</Box>
				)}
				{(song.dromos && song.dromos.length > 0) && (
					<Box className={classes.inline}>
						<label>Dromos: </label>
						{song?.dromos.map((dromos) => {
							return <Chip className={classes.chip} key={`${song.id}-${dromos}`} color="primary" size="small" label={dromos} />;
						})}
					</Box>
				)}
				{ song.key && (
					<Box className={classes.inline}>
						<label>Key: </label>
						<Chip
							className={classes.chip} 
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
											onChange={(selection: BaseSyntheticEvent) => {
												handleKeyChange(selection.target.value);
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
					<Box className={classes.inline}>
						<label>Tempo: </label>
						<Chip className={classes.chip} variant="outlined" color="primary" size="small" label={song.tempo} />
					</Box>
				)}
				{song.notes && (
					<Box className={classes.notes}>
						<label>Notes: </label>
						{song.notes}
					</Box>
				)}
				{song?.body && 
					<Typography ref={strongRef} variant="body1" className={`${classes.mainContent} SongBody`}></Typography>
				}
			</Container>
			<FabMenu toggleDrawer={toggleDrawer}/>
			<Drawer anchor='bottom' open={showDrawer} onClose={toggleDrawer}>
				<Button 
					className={classes.btn} 
					onClick={()=>{
						song && setSelectedSong(song);
						navigate("/edit-song");
					}} 
					variant="contained" 
					color="primary"
					startIcon={<EditIcon />}
				>Edit Song</Button>
				<Button 
					className={classes.btn} 
					onClick={()=>{ 
						song && handleShowDeletePopup(song);
					} } 
					variant="contained" 
					color="secondary"
					startIcon={<DeleteIcon />}
				>Delete Song!!</Button>
			</Drawer>
		</div>
	);
};

export default Song;
