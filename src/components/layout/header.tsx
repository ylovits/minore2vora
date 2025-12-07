import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "assets/img/logo.png";
import ListIcon from "@mui/icons-material/List";
import useStore from "store/globalStore";
import "./header.scss";
import { stringToSlug } from "utils/characterMap";

interface IProps {
	logout: () => void;
	handleSearchChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
	showSearch: boolean
}

const Header: React.FC<IProps> = ({ logout, handleSearchChange, showSearch }: IProps) => {
	const navigate = useNavigate();
	/**
	 * Import global state parts needed
	 */
	const activePlaylist = useStore((state) => { return state.activePlaylist; });

	return (
		<div className="Header">
			<AppBar position="static">
				<Toolbar>
					<Typography
						onClick={() => {
							navigate("/song-list");
						}}
						className="title"
						variant="h6"
						noWrap
					>
						Μινόρε του Βορρά
					</Typography>
					<img
						src={HomeIcon}
						onClick={() => {
							navigate("/song-list");
						}}
						className="homeBtn"
					/>
					{activePlaylist && <Typography
						onClick={() => {
							navigate(`/playlist/${stringToSlug(activePlaylist)}`);
						}}
						className="playlistTitle"
						variant="h6"
						noWrap
					>
						{activePlaylist}
					</Typography>}
					{activePlaylist && 	<ListIcon
						onClick={() => {
							navigate(`/playlist/${stringToSlug(activePlaylist)}`);
						}}
						className="playlistBtn"
					/>}

					<div className="search">
						{showSearch && (
							<>
								<div className="searchIcon">
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Search…"
									classes={{
										root: "inputRoot",
										input: "inputInput",
									}}
									inputProps={{ "aria-label": "search" }}
									onChange={handleSearchChange}
								/>
							</>)
						}
					</div>
					<IconButton
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={() => {
							return logout();
						}}
						color="inherit"
					>
						<ExitToAppIcon />
					</IconButton>

				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
