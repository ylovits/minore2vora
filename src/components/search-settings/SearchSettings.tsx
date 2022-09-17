import * as React from "react";
import {
	Box,
	Modal,
	FormGroup,
	FormControlLabel,
	Checkbox,
	FormControl,
	Input,
	InputLabel,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import useStore from "store/globalStore";
import Fab from "@mui/material/Fab";
import { useEffect } from "react";
import { scales, rythmoi } from "data/data";
import { AllKeys, AllRythms } from "interfaces/interfaces";
import "./SearchSettings.scss";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

interface MappedFilters {
	rhythm: AllRythms[],
	key: AllKeys,
}

export default function SearchSettings() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	/* Import global state parts needed */
	const [_glob, setShowOnlyReady, showOnlyReady, _setFilteredBy, filteredBy] =
		useStore((state) => {
			return [
				state,
				state.setShowOnlyReady,
				state.showOnlyReady,
				state.setFilteredBy,
				state.filteredBy,
			];
		});

	const [checked, setChecked] = React.useState(showOnlyReady);

	const toggleShowOnlyReady = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	useEffect(() => {
		setShowOnlyReady(checked);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checked]);

	const [mappedFilters, setMappedFilters] = React.useState<MappedFilters>({
		rhythm: [],
		key: "D",
	});

	useEffect(() => {
		const newMappedFilters: MappedFilters = {
			rhythm: [],
			key: "D",
		};

		filteredBy.forEach((filter) => {
			if (filter.type === "key") {
				newMappedFilters.key = filter.value as AllKeys;
			} else if (filter.type === "rhythm") {
				filter.value && newMappedFilters.rhythm.push(filter.value as AllRythms);
			}
		});

		setMappedFilters(newMappedFilters);

	}, [filteredBy]);

	const onChangeSelect = (option: string | string[], attribute: string) => {
		console.log("option:", option, "attribute", attribute);

		// setSong((song) => {
		// 	return { ...song, [attribute]: option };
		// });
	};

	return (
		<div className="SearchSettings">
			<Fab
				onClick={handleOpen}
				color="primary"
				aria-label="add"
				className="filters"
				size="small"
			>
				<FilterListIcon />
			</Fab>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									checked={showOnlyReady}
									onChange={toggleShowOnlyReady}
								/>
							}
							label="Show only presentable songs"
						/>
					</FormGroup>

					<FormControl
						style={{ margin: "0.5rem 0", color: "#000" }}
						className="formControl"
						fullWidth
					>
						<InputLabel>Κλειδί</InputLabel>
						<Select
							value={mappedFilters.key}
							onChange={(selection: SelectChangeEvent) => {
								console.log(selection);

								// setSong((song) => {
								// 	return { ...song, key: selection.target.value };
								// });
							}}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 260,
										width: 240,
										zIndex: 35003,
									},
								},
							}}
							input={<Input />}
						>
							{scales.map((scale) => {
								return (
									<MenuItem key={scale.label} value={scale.label}>
										{scale.label}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>

					<FormControl
						style={{ margin: "0.5rem 0", color: "#000" }}
						className="formControl"
						fullWidth
					>
						<InputLabel>Ρυθμός</InputLabel>
						<Select
							multiple
							value={mappedFilters.rhythm}
							onChange={(options) => {
								const values: string[] = [];
								if (options) {
									(options.target.value as string[]).forEach(
										(option: string) => {
											values.push(option);
										}
									);
								}
								onChangeSelect(values, "rhythm");
							}}
							renderValue={(selected) => {
								return (selected as string[]).join(", ");
							}}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 260,
										width: 240,
										zIndex: 35001,
									},
								},
							}}
							input={<Input />}
						>
							{rythmoi.map((rhythm) => {
								return (
									<MenuItem key={rhythm.label} value={rhythm.label}>
										<Checkbox
											checked={
												!!rhythm.label &&
												mappedFilters.rhythm.includes(rhythm.label as AllRythms)
											}
										/>
										<ListItemText primary={rhythm.label} />
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Box>
			</Modal>
		</div>
	);
}
