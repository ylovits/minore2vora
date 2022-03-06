import * as React from "react";
import { Box, Modal, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import useStore from "store/globalStore";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import "./SearchSettings.scss";
import { useEffect } from "react";

const style = {
	position: "absolute" ,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const useStyles = makeStyles(() => {
	return createStyles({
		filters: {
			position:"fixed",
			bottom:"1em",
			right:"5em",
			backgroundColor: "#E64A19"
		},
	});
});

export default function BasicModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => { setOpen(true); };
	const handleClose = () => { setOpen(false); };
	const classes = useStyles();

	/* Import global state parts needed */
	const [_glob, setShowOnlyReady, showOnlyReady] = useStore((state) => {
		return [state, state.setShowOnlyReady, state.showOnlyReady];
	});

	const [checked, setChecked] = React.useState(showOnlyReady);
	
	const toggleShowOnlyReady = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	useEffect(() => {
		setShowOnlyReady(checked);
	}, [checked]);
	

	return (
		<div>
			<Fab
				onClick={handleOpen}
				color="primary"
				aria-label="add"
				className={classes.filters}
				size="small"
			><FilterListIcon /></Fab>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>


					<FormGroup>
						<FormControlLabel control={	<Checkbox 
							checked={showOnlyReady}
							onChange={toggleShowOnlyReady}
						/>} label="Show only presentable songs" />
					</FormGroup>
				</Box>
			</Modal>
		</div>
	);
}
