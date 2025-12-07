import { Grid, Paper } from "@mui/material";
import { IPlaylist } from "interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import useStore from "store/globalStore";
import { stringToSlug } from "utils/characterMap";
import "./playlists.scss";

const Playlists = () => {
	const navigate = useNavigate();

	/* Import global state parts needed */
	const playlists = useStore((state) => {
		return state.playlists;
	});

	return (
		<div className="Playlists">
			{playlists
				.map((playlist: IPlaylist) => {
					return (
						<Paper
							className="paper"
							key={`playlist-${playlist.name}`}
							onClick={() => {
								navigate(`/playlist/${stringToSlug(playlist.name)}`);
							}}>
							<Grid container wrap="nowrap">
								<Grid className="wrapper">
									<p className="title">{playlist.name}</p>
								</Grid>
							</Grid>
						</Paper>
					);
				})}
		</div>
	);
};

export default Playlists;
