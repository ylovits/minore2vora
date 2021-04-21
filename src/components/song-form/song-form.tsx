import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { rythmoi, keys, dromoi } from '../../data/data';
import useStore from 'store/globalStore';
import { ISong } from '../../interfaces/interfaces';

interface IProps {
	handleSubmit: (_sng: ISong) => void;
}

interface IFormProps {
	name: string;
	label: string;
	isSelect: boolean;
	children: React.ReactNode;
}
const FormPiece: React.FC<IFormProps> = ({ name, label, isSelect, children }: IFormProps) => {
	return (
		<div className="form-group row">
			<label
				htmlFor={name}
				className="col-md-2 text-right col-md-form-label"
				style={{ textTransform: 'capitalize' }}
			>
				{label}
			</label>
			{isSelect ? <>{children}</> : <div className="col-md-10">{children}</div>}
		</div>
	);
};

const SongForm: React.FC<IProps> = ({ handleSubmit }: IProps) => {
	/**
	 * Import global state parts needed
	 */
	const [selectedSong] = useStore((state) => {
		return [ state.selectedSong];
	});

	const [song, setSong] = useState({
		id: '',
		title: '',
		youtube: '',
		tempo: 0,
		rythm: '',
		key: '',
		dromos: '',
		body: '',
		presentable: false,
		notes: '',
	});

	const onChangeSelect = (option: string, attribute: string) => {
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


	console.log(song);
	return (
		<form className="container">
			<FormPiece isSelect={false} label="Τίτλος" name="title">
				<input
					onChange={(e) => {
						setSong((song) => {
							return { ...song, title: e.target.value };
						});
					}}
					id="title"
					name="title"
					placeholder="Τίτλος"
					type="text"
					className="form-control"
					required
					value={song.title}
				/>
			</FormPiece>
			<FormPiece isSelect={false} label="youtube" name="youtube">
				<input
					id="youtube"
					name="youtube"
					placeholder="Yourtube URL"
					type="text"
					className="form-control"
					onChange={(e) => {
						return setSong((song) => {
							return { ...song, youtube: e.target.value };
						});
					}}
					value={song.youtube}
				/>
			</FormPiece>

			<FormPiece isSelect={false} label="Στίχοι" name="stixoi">
				<>
					<span id="stixoiHelpBlock" className="form-text text-muted">
						Εδώ μπαίνουν οι στίχοι - ακόρντα
					</span>
					<textarea
						id="stixoi"
						name="stixoi"
						className="form-control"
						aria-describedby="stixoiHelpBlock"
						required
						onChange={(e) => {
							setSong((song) => {
								return { ...song, body: e.target.value };
							});
						}}
						value={song.body}
						rows={15}
					></textarea>
				</>
			</FormPiece>
			<FormPiece isSelect={true} label="Κλειδί" name="key">
				<Select
					classNamePrefix={'select'}
					options={keys}
					onChange={(option) => {
						option && option.value && onChangeSelect(option.value, 'key');
					}}
					value={keys.find((key) => {
						return key.value === song.key;
					})}
					className="col-md-10 z-2"
					required
				/>
			</FormPiece>
			<FormPiece isSelect={true} label="Δρόμοι" name="dromoi">
				<Select
					classNamePrefix={'select'}
					options={dromoi}
					onChange={(option) => {
						option && option.value && onChangeSelect(option.value, 'dromos');
					}}
					value={dromoi.find((dromos) => {
						return dromos.value === song.dromos;
					})}
					className="col-md-10 z-2"
					required
				/>
			</FormPiece>
			<FormPiece isSelect={true} label="Ρυθμός" name="rythm">
				<Select
					classNamePrefix={'select'}
					options={rythmoi}
					onChange={(option) => {
						option && option.value && onChangeSelect(option.value.name, 'rythm');
					}}
					value={rythmoi.find((rythm) => {
						return rythm.value.name === song.rythm;
					})}
					className="col-md-10 z-2"
					required
				/>
			</FormPiece>
			<FormPiece isSelect={false} label="Τέμπο" name="tempo">
				<input
					name="tempo"
					type="number"
					className="form-control"
					value={song.tempo}
					onChange={(e) => {
						return setSong((song) => {
							return {
								...song,
								tempo: e.target.valueAsNumber,
							};
						});
					}}
				/>
			</FormPiece>
			<FormPiece isSelect={false} label="Σημειώσεις - σχόλια" name="notes">
				<textarea
					id="notes"
					name="notes"
					className="form-control"
					value={song.notes}
					onChange={(e) => {
						return setSong((song) => {
							return { ...song, notes: e.target.value };
						});
					}}
				></textarea>
			</FormPiece>
			<FormPiece isSelect={false} label="Έτοιμο;" name="presentable_0">
				<div className="form-check">
					<input
						name="presentable"
						id="presentable_0"
						type="checkbox"
						className="form-check-input"
						value="presentable"
						aria-describedby="presentableHelpBlock"
						checked={song.presentable}
						onChange={(_e) => {
							return setSong((song) => {
								return {
									...song,
									presentable: !song.presentable,
								};
							});
						}}
					/>
					<label htmlFor="presentable_0" className="form-check-label">
						Είναι έτοιμο για παρουσίαση;
					</label>
				</div>
			</FormPiece>

			<div className="form-group row">
				<div className="offset-2 col-md-10">
					<button
						name="submit"
						type="submit"
						className="btn btn-primary"
						onClick={() => {
							return handleSubmit(song);
						}}
					>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};

export default SongForm;
