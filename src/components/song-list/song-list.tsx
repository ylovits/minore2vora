import React from 'react';
import useStore from 'store/globalStore';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { fade, makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ISong } from 'interfaces/interfaces';
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
			maxWidth: '80%',
			margin: `${theme.spacing(1)}px auto`,
			padding: theme.spacing(2),
			cursor: 'pointer',
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
		},
	});
});

const SongList: React.FC = () => {
	/**
	 * Import global state parts needed
	 */
	const [goToPage, setSelectedSong, songs] = useStore((state) => {
		return [state.goToPage, state.setSelectedSong, state.songs];
	});

	const classes = useStyles();

	return (
		<div className={classes.root}>
			{songs.map((song: ISong) => {
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
