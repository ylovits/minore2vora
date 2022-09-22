import React, { useEffect, useState, useRef } from "react";
import useStore from "store/globalStore";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ISong } from "interfaces/interfaces";
import {
	reduceToGreeklish,
	removeAccents,
	stringToSlug,
} from "utils/characterMap";
import "./song-list.scss";


import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import Filters from "components/ui/filters";
interface IProps {
	searchTerm: string;
}

const SongList: React.FC<IProps> = ({ searchTerm }: IProps) => {
	const navigate = useNavigate();

	/**
	 * Import global state parts needed
	 */
	const [setSelectedSong, songs, showOnlyReady, setShowFilters, showFilters] = useStore((state) => {
		return [state.setSelectedSong, state.songs, state.showOnlyReady, state.setShowFilters, state.showFilters,];
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

	useEffect(() => {
		setShowFilters(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="SongList">
			{showFilters && <Filters />}
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
							<Grid container wrap="nowrap">
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
		</div>
	);
};

export default SongList;
