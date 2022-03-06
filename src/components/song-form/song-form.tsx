import React, { useState, useEffect, BaseSyntheticEvent } from "react";
import { rythmoi, scales, dromoi } from "data/data";
import useStore from "store/globalStore";
import { AllDromoi, ISong } from "interfaces/interfaces";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FormControlLabel, Checkbox, Container, TextField, MenuItem, FormControl, Input, Select, InputLabel, ListItemText} from "@material-ui/core";
interface IProps {
	handleSubmit: (_sng: ISong) => void;
	handleSuccess: () => void;
}


const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		root: {
			display: "flex",
			flexDirection: "column",
		},
		form: {
			flexGrow: 1,
			overflow: "hidden",
			paddingTop: "1rem",
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
	});
});


const SongForm: React.FC<IProps> = ({ handleSubmit, handleSuccess }: IProps) => {

	const classes = useStyles();

	/**
	 * Import global state parts needed
	 */
	const [selectedSong] = useStore((state) => {
		return [state.selectedSong];
	});

	const [song, setSong] = useState<ISong>({
		id: "",
		title: "",
		youtube: "",
		tempo: 1,
		rhythm: [],
		key: "D",
		dromos: [],
		body: "",
		presentable: false,
		notes: "",
	});

	const onChangeSelect = (option: string | string[], attribute: string) => {
		setSong((song) => {
			return { ...song, [attribute]: option };
		});
	};

	useEffect(() => {
		if (selectedSong !== null) {
			setSong(selectedSong);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={classes.form}>
			<Container maxWidth="md">
				<TextField
					id="title"
					label="Τίτλος"
					style={{ margin: "0.5rem 0" }}
					placeholder="Τίτλος"
					fullWidth
					margin="normal"
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					onChange={(e) => {
						setSong((song) => {
							return { ...song, title: e.target.value };
						});
					}}
					value={song.title}
					autoComplete="off"
					required
				/>
				<TextField
					id="youtube"
					label="youtube"
					style={{ margin: "0.5rem 0" }}
					placeholder="Yourtube URL"
					fullWidth
					margin="normal"
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					onChange={(e) => {
						return setSong((song) => {
							return { ...song, youtube: e.target.value };
						});
					}}
					value={song.youtube}
					autoComplete="off"
				/>

				<TextField
					multiline
					rows={15}
					id="stixoi"
					label="Στίχοι"
					style={{ margin: "0.5rem 0" }}
					placeholder="Εδώ μπαίνουν οι στίχοι - ακόρντα"
					fullWidth
					margin="normal"
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					onChange={(e) => {
						setSong((song) => {
							return { ...song, body: e.target.value };
						});
					}}
					value={song.body}
					autoComplete="off"
					variant="outlined"
				/>

				<FormControl 
					style={{ margin: "0.5rem 0", color:"#000" }}
					className={classes.formControl}
					fullWidth
				>
					<InputLabel >Κλειδί</InputLabel>
					<Select
						value={song.key}
						onChange={(selection: BaseSyntheticEvent) => {
							setSong((song) => {
								return { ...song, key: selection.target.value };
							});
						}}
						MenuProps={{ 
							PaperProps: {
								style: {
									maxHeight: 260,
									width: 240,
									zIndex: 35003
								}
							}
						}}
						input={<Input />}
					>
						{scales.map((scale) => { 
							return (
								<MenuItem key={scale.label} value={scale.label} >{scale.label}</MenuItem>
							);
						})}
					</Select>
				</FormControl>

				<FormControl 
					style={{ margin: "0.5rem 0", color:"#000" }}
					className={classes.formControl}
					fullWidth
				>
					<InputLabel >Δρόμοι</InputLabel>
					<Select
						multiple
						value={song.dromos}
						onChange={(options) => {
							const values: string[] = [];
							if (options) {
								(options.target.value as string[]).forEach((option: string) => {
									values.push(option);
								});
							}
							onChangeSelect(values, "dromos");
						}}
						renderValue={(selected) => { return (selected as string[]).join(", "); }}
						MenuProps={{ 
							PaperProps: {
								style: {
									maxHeight: 260,
									width: 240,
									zIndex: 35002
								}
							}
						}}
						input={<Input />}
					>
						{dromoi.map((dromos) => { 
							return (
								<MenuItem key={dromos.label} value={dromos.label} >
									<Checkbox checked={!!dromos.label && song.dromos.includes(dromos.label as AllDromoi)} />
									<ListItemText primary={dromos.label} />
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>

				<FormControl 
					style={{ margin: "0.5rem 0", color:"#000" }}
					className={classes.formControl}
					fullWidth
				>
					<InputLabel >Ρυθμός</InputLabel>
					<Select
						multiple
						value={song.rhythm}
						onChange={(options) => {
							const values: string[] = [];
							if (options) {
								(options.target.value as string[]).forEach((option: string) => {
									values.push(option);
								});
							}
							onChangeSelect(values, "rhythm");
						}}
						renderValue={(selected) => { return (selected as string[]).join(", "); }}
						MenuProps={{ 
							PaperProps: {
								style: {
									maxHeight: 260,
									width: 240,
									zIndex: 35001
								}
							}
						}}
						input={<Input />}
					>
						{rythmoi.map((rhythm) => { 
							return (
								<MenuItem key={rhythm.label} value={rhythm.label} >
									<Checkbox checked={rhythm.label in song.rhythm} />
									<ListItemText primary={rhythm.label} />
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>

				<TextField
					id="tempo"
					label="Tempo"
					style={{ margin: "0.5rem 0" }}
					placeholder="Τέμπο"
					fullWidth
					margin="normal"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
					onChange={(e) => {
						return setSong((song) => {
							return {
								...song,
								tempo: Number(e.target.value),
							};
						});
					}}
					value={song.tempo}
					autoComplete="off"
				/>


				<TextField
					multiline
					rows={15}
					id="notes"
					label="Νotes"
					style={{ margin: "0.5rem 0" }}
					placeholder="Σημειώσεις - σχόλια"
					fullWidth
					margin="normal"
					type="text"
					InputLabelProps={{
						shrink: true,
					}}
					onChange={(e) => {
						return setSong((song) => {
							return { ...song, notes: e.target.value };
						});
					}}
					value={song.notes}
					autoComplete="off"
					variant="outlined"
				/>
				<FormControlLabel
					control={
						<Checkbox
							style={{ margin: "0.5rem 0" }}
							checked={song.presentable}
							onChange={(_e) => {
								return setSong((song) => {
									return {
										...song,
										presentable: !song.presentable,
									};
								});
							}}
							name="presentable"
						/>
					}
					label="Είναι έτοιμο για παρουσίαση;"
				/>


				<div className="form-group row">
					<div className="offset-2 col-md-10">
						<Button
							style={{ margin: "0.5rem 0" }}
							name="submit"
							type="submit"
							onClick={() => {
								handleSuccess();								
								return handleSubmit(song);
							}}
							variant="contained"
							color="primary"
						>
							Submit
						</Button>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default SongForm;
