
import React from "react";
import Fab from "@mui/material/Fab";
import BorderAllIcon from '@mui/icons-material/BorderAll';
import "./fab-show-chord-boxes.scss";
interface IProps {
	toggleBoxes: () => void;
}

const FabShowChordBoxes: React.FC<IProps> = ({ toggleBoxes }: IProps) => {
	return (
		<Fab
			onClick={() => {
				toggleBoxes();
			}}
			color="info"
			aria-label="menu"
			className="fabShowChordBoxes"
			size="small"
		>
			<BorderAllIcon />
		</Fab>
	);
};

export default FabShowChordBoxes;
