import React, { useEffect, useState, useRef } from 'react';
import useStore from 'store/globalStore';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { alpha, makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ISong } from 'interfaces/interfaces';
import { removeAccents } from 'components/main-controller/characterMap';
import './song-list.scss';

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		root: {
			flexGrow: 1,
			overflow: 'hidden',
			padding: theme.spacing(0, 3),
			paddingTop: '1rem',
		},
		paper: {
			maxWidth: '100%',
			[theme.breakpoints.up('sm')]: {
				width: '90%',
				maxWidth: '90%',
			},
			[theme.breakpoints.up('md')]: {
				maxWidth: '600px',
			},
			margin: `${theme.spacing(1)}px auto`,
			padding: theme.spacing(2),
			cursor: 'pointer',
			'&:hover': {
				backgroundColor: alpha(theme.palette.common.white, 0.25),
			},
		},
	});
});

interface IProps {
	searchTerm:string;
}

const SongList: React.FC<IProps> = ({searchTerm}:IProps) => {
	/**
	 * Import global state parts needed
	 */
	const [goToPage, setSelectedSong, songs] = useStore((state) => {
		return [state.goToPage, state.setSelectedSong, state.songs];
	});

	const classes = useStyles();


	/**
	 * Searching
	 */

	const [searchResults, setSearchResults] = useState(JSON.parse(JSON.stringify(songs)));
	
	const initSongs = useRef(JSON.parse(JSON.stringify(songs)));
	
	useEffect(() => {
		const results = initSongs.current.filter((song: ISong) => {
			return removeAccents(song.title).toLowerCase().includes(searchTerm);
		});
		setSearchResults(results);
	}, [searchTerm]);

	return (
		<div className={classes.root}>
			{searchResults.sort((a:ISong, b:ISong) => { return ('' + a.title).localeCompare(b.title); }).map((song: ISong) => {
				return (
					<Paper
						className={classes.paper}
						key={`song-${song.title}`}
						onClick={() => {
							setSelectedSong(song);
							goToPage('song');
						}}
					>
						<Grid container wrap="nowrap" spacing={2}>
							<Grid item>{song.title}</Grid>
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
						goToPage('new-song');
					}}
					variant="contained"
					color="primary"
				>
					Add song
				</Button>
			</div>
		</div>
	);
};

export default SongList;
