import React, { useState, useEffect } from 'react';
import { MultipleSelect } from 'react-select-material-ui';
import { rythmoi, keys, dromoi } from '../../data/data';
import useStore from 'store/globalStore';
import { ISong } from '../../interfaces/interfaces';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { FormControlLabel, Checkbox, Container, TextField} from '@material-ui/core';
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
			padding: theme.spacing(3),
			paddingTop: '1rem',
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
			maxWidth: 300,
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
				<div className={classes.root}>

					<TextField
						id="title"
						label="Τίτλος"
						style={{ margin: 8 }}
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
						style={{ margin: 8 }}
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
						style={{ margin: 8 }}
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

					<MultipleSelect
						label="Κλειδιά"
						options={keys}
						style={{ margin: 8, zIndex: 35003, color:'#000' }}
						onChange={(options) => {
							const values: string[] = [];
							if (options) {
								options.forEach((option:{label:string; value:string;}) => {
									values.push(option.value);
								});
							}
							onChangeSelect(values, 'key');
						}}
						defaultValue={keys.filter((key) => {
							return song.key.includes(key.value);
						})}
						className="col-md-10 z-2"
						required
					/>

					<MultipleSelect
						label="Δρόμοι"
						style={{ margin: 8, zIndex: 35002, color:'#000'  }}
						options={dromoi}
						onChange={(options) => {
							const values: string[] = [];
							if (options) {
								options.forEach((option:{label:string; value:string;}) => {
									values.push(option.value);
								});
							}
							onChangeSelect(values, 'dromos');
						}}
						defaultValue={dromoi.filter((dromos) => {
							return song.dromos.includes(dromos.value);
						})}
						className="col-md-10 z-2"
						required
					/>

					<MultipleSelect
						label="Ρυθμός"
						style={{ margin: 8, zIndex: 35001, color:'#000' }}
						options={rythmoi}
						onChange={(options) => {
							const values: string[] = [];
							if (options) {
								options.forEach((option: {label:string; value:{name:string; rythm:string;}}) => {
									values.push(option.label);
								});
							}
							onChangeSelect(values, 'rythm');
						}}
						defaultValue={rythmoi.filter((rythm) => {
							return song.rythm.includes(rythm.label);
						})}
						className="col-md-10 z-2"
						required
					/>


					<TextField
						id="tempo"
						label="Tempo"
						style={{ margin: 8 }}
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
						style={{ margin: 8 }}
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
								style={{ margin: 8 }}
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
								style={{ margin: 8 }}
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
				</div>
			</Container>
		</form>
	);
};

export default SongForm;
