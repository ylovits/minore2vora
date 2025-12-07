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

import useStore from "store/globalStore";
import { useEffect } from "react";
import { scales, rythmoi } from "data/data";
import { AllKeys, AllRythms } from "interfaces/interfaces";
import "./filters.scss";


interface MappedFilters {
	rhythm: AllRythms[],
	key: AllKeys,
}

export default function Filters() {
	/* Import global state parts needed */
	const setShowOnlyReady = useStore((state) => { return state.setShowOnlyReady; });
	const showOnlyReady = useStore((state) => { return state.showOnlyReady; });
	const filteredBy = useStore((state) => { return state.filteredBy; });
	const setShowFilters = useStore((state) => { return state.setShowFilters; });


	const handleClose = () => {
		setShowFilters(false);
	};

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

	const onChangeSelect = (_option: string | string[], _attribute: string) => {
		// setSong((song) => {
		// 	return { ...song, [attribute]: option };
		// });
	};

	return (
		<div className="filters">
			<Modal
				className="modal"
				open={true}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className="modalContainer" sx={{backgroundColor: "background.paper"}}>
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
					{ false && <>
						<FormControl
							style={{ margin: "0.5rem 0", color: "#000" }}
							className="formControl"
							fullWidth
						>
							<InputLabel>Κλειδί</InputLabel>
							<Select
								value={mappedFilters.key}
								onChange={(_selection: SelectChangeEvent) => {
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
					</> }
				</Box>
			</Modal>
		</div>
	);
}
