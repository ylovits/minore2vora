import React from "react";
import { AllRythms } from "interfaces/interfaces";
import { Chip, Typography, Popover } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "./RhythmPopover.scss";

interface IProps {
	rhythmName: AllRythms;
	rhythmDesription: string;
}

const RhythmPopover = ({ rhythmName, rhythmDesription }: IProps) => {

	const [rhythmAnchorEl, setRhythmAnchorEl] = React.useState<Element | ((_element: Element) => Element) | null | undefined>(null);

	const handleRhythmClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setRhythmAnchorEl(event.currentTarget);
	};

	const handleRhythmClose = () => {
		setRhythmAnchorEl(null);
	};

	const openRhythm = Boolean(rhythmAnchorEl);

	return (
		<span className="RhythmPopover">
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
				<Typography className="popPad">{rhythmDesription}</Typography>
			</Popover>
			<Chip
				size="small"
				onClick={handleRhythmClick}
				icon={<InfoIcon />}
				label={`${rhythmName}`}
				className="clickable"
			/>
		</span>
	);
};

export default RhythmPopover;
