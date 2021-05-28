import React, { useState, useEffect } from 'react';
import { rythmoi, keys, dromoi } from '../../data/data';
import useStore from 'store/globalStore';
import { ISong } from '../../interfaces/interfaces';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, Container, TextField, MenuItem, FormControl, Input, Select, InputLabel, ListItemText} from '@material-ui/core';
interface IProps {
	handleSubmit: (_sng: ISong) => void;
}


const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
		},
		form: {
			flexGrow: 1,
			overflow: 'hidden',
			paddingTop: '1rem',
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
	});
});


const SongForm: React.FC<IProps> = ({ handleSubmit }: IProps) => {

	const classes = useStyles();

	/**
	 * Import global state parts needed
	 */
	const [selectedSong] = useStore((state) => {
		return [state.selectedSong];
	});

	const [song, setSong] = useState<ISong>({
		id: '',
		title: '',
		youtube: '',
		tempo: 1,
		rythm: [],
		key: [],
		dromos: [],
		body: '',
		presentable: false,
		notes: '',
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
		<form className={classes.form} autoComplete="off">
			<Container maxWidth="md">
				<TextField
					id="title"
					label="Τίτλος"
					style={{ margin: '0.5rem 0' }}
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
					style={{ margin: '0.5rem 0' }}
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
					required
				/>

				<TextField
					multiline
					rows={15}
					id="stixoi"
					label="Στίχοι"
					style={{ margin: '0.5rem 0' }}
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
					required
				/>

				<FormControl 
					style={{ margin: '0.5rem 0', color:'#000' }}
					className={classes.formControl}
					fullWidth
				>
					<InputLabel >Κλειδιά</InputLabel>
					<Select
						multiple
						value={song.key}
						onChange={(options) => {
							const values: string[] = [];
							if (options) {
								(options.target.value as string[]).forEach((option: string) => {
									values.push(option);
								});
							}
							onChangeSelect(values, 'key');
						}}
						renderValue={(selected) => { return (selected as string[]).join(', '); }}
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
						{keys.map((musicKey) => { 
							return (
								<MenuItem key={musicKey.label} value={musicKey.label} >
									<Checkbox checked={song.key.indexOf(musicKey.label) > -1} />
									<ListItemText primary={musicKey.label} />
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>

				<FormControl 
					style={{ margin: '0.5rem 0', color:'#000' }}
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
							onChangeSelect(values, 'dromos');
						}}
						renderValue={(selected) => { return (selected as string[]).join(', '); }}
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
									<Checkbox checked={song.dromos.indexOf(dromos.label) > -1} />
									<ListItemText primary={dromos.label} />
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>

				<FormControl 
					style={{ margin: '0.5rem 0', color:'#000' }}
					className={classes.formControl}
					fullWidth
				>
					<InputLabel >Ρυθμός</InputLabel>
					<Select
						multiple
						value={song.rythm}
						onChange={(options) => {
							const values: string[] = [];
							if (options) {
								(options.target.value as string[]).forEach((option: string) => {
									values.push(option);
								});
							}
							onChangeSelect(values, 'rythm');
						}}
						renderValue={(selected) => { return (selected as string[]).join(', '); }}
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
						{rythmoi.map((rythm) => { 
							return (
								<MenuItem key={rythm.label} value={rythm.label} >
									<Checkbox checked={song.rythm.indexOf(rythm.label) > -1} />
									<ListItemText primary={rythm.label} />
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>

				<TextField
					id="tempo"
					label="Tempo"
					style={{ margin: '0.5rem 0' }}
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
					required
				/>


				<TextField
					multiline
					rows={15}
					id="notes"
					label="Νotes"
					style={{ margin: '0.5rem 0' }}
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
					required
				/>
				<FormControlLabel
					control={
						<Checkbox
							style={{ margin: '0.5rem 0' }}
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
							style={{ margin: '0.5rem 0' }}
							name="submit"
							type="submit"
							onClick={() => {
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
		</form>
	);
};

export default SongForm;
