import React from "react";
import { AllRythms } from "interfaces/interfaces";
import { Chip, Typography, Popover } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";

interface IProps {
	rhythmName: AllRythms;
	rhythmDesription: string;
}

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		clickable: {
			cursor: "pointer",
		},
		popPad: {
			padding: theme.spacing(2),
		},
		breather: {
			marginRight:"0.5rem"
		}
	});
});

const RhythmPopover = ({rhythmName, rhythmDesription}:IProps) => {

	const classes = useStyles();

	const [rhythmAnchorEl, setRhythmAnchorEl] = React.useState<Element | ((_element: Element) => Element) | null | undefined>(null);

	const handleRhythmClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setRhythmAnchorEl(event.currentTarget);
	};
  
	const handleRhythmClose = () => {
		setRhythmAnchorEl(null);
	};
  
	const openRhythm = Boolean(rhythmAnchorEl);

	return (
		<span className={classes.breather}>
			<Popover
				id={rhythmName}
				open={openRhythm}
				anchorEl={rhythmAnchorEl}
				onClose={handleRhythmClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<Typography className={classes.popPad}>{rhythmDesription}</Typography>
			</Popover>
			<Chip
				size="small"
				onClick={handleRhythmClick}
				icon={<InfoIcon />}
				label={`${rhythmName}`}
				className={classes.clickable}
			/>
		</span>
	);
};

export default RhythmPopover;
