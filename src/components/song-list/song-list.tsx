import React, { useEffect, useState, useRef } from "react";
import useStore from "store/globalStore";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ISong } from "interfaces/interfaces";
import {
	reduceToGreeklish,
	removeAccents,
	stringToSlug,
} from "utils/characterMap";
import "./song-list.scss";
import SearchSettings from "components/search-settings/SearchSettings";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
interface IProps {
	searchTerm: string;
}

const SongList: React.FC<IProps> = ({ searchTerm }: IProps) => {
	const navigate = useNavigate();

	/**
	 * Import global state parts needed
	 */
	const [setSelectedSong, songs, showOnlyReady] = useStore((state) => {
		return [state.setSelectedSong, state.songs, state.showOnlyReady];
	});

	/**
	 * Searching
	 */
	const [searchResults, setSearchResults] = useState(
		JSON.parse(JSON.stringify(songs))
	);

	const initSongs = useRef(JSON.parse(JSON.stringify(songs)));

	useEffect(() => {
		const results = initSongs.current.filter((song: ISong) => {
			return reduceToGreeklish(removeAccents(song.title))
				.toLowerCase()
				.includes(searchTerm);
		});

		const filteredResults = showOnlyReady
			? results.filter((song: ISong) => {
				return song.presentable;
			})
			: results;
		setSearchResults(filteredResults);
	}, [searchTerm, showOnlyReady]);

	return (
		<div className="SongList">
			<SearchSettings />
			{searchResults
				.sort((a: ISong, b: ISong) => {
					return ("" + a.title).localeCompare(b.title);
				})
				.map((song: ISong) => {
					return (
						<Paper
							className="paper"
							key={`song-${song.title}`}
							onClick={() => {
								setSelectedSong(song);
								navigate(`/song/${stringToSlug(song.title)}`);
							}}>
							<Grid container wrap="nowrap" spacing={2}>
								<Grid className="wrapper" item>
									<p className="title">{song.title}</p>
									{song.presentable && (
										<span className="alignLeft">
											<StarIcon />
										</span>
									)}
								</Grid>
							</Grid>
						</Paper>
					);
				})}
			<div className="AddSong">
				<Button
					name="submit"
					type="submit"
					onClick={() => {
						setSelectedSong(null);
						navigate("/new-song");
					}}
					variant="contained"
					color="primary">
					Add song
				</Button>
			</div>
		</div>
	);
};

export default SongList;
