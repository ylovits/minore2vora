import React, { useState } from 'react';
import { ISong } from 'interfaces/interfaces';
import useStore from 'store/globalStore';
import { Button, Chip, Typography, Container, Box, Popover, Drawer } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { rythmoi } from 'data/data';
import FabMenu from 'components/ui/fab-menu';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './song.scss';

interface IProps {
	song: ISong | null;
	setShowDeletePopup: () => void;
}

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			paddingBottom: theme.spacing(5),
		},
		chips: {
			display: 'flex',
			justifyContent: 'center',
			flexWrap: 'wrap',
			listStyle: 'none',
			padding: theme.spacing(0.5),
			margin: 0,
		},
		chip: {
			margin: theme.spacing(0.5),
		},
		titleLink: {
			textDecoration: 'none',
			color: theme.palette.primary.main,		
		},
		title: {
			margin: theme.spacing(1, 0),
		},
		inline: {
			margin: '1rem 1rem 1rem 0',
			display: 'inline-block',
		},
		popPad: {
			padding: theme.spacing(2),
		},
		mainContent: {
			padding: theme.spacing(2, 0),
			whiteSpace: 'pre-line',

		},
		btn: {
			borderRadius: 0,
			padding: theme.spacing(3, 0),
		}
	});
});




const Song: React.FC<IProps> = ({ song, setShowDeletePopup }: IProps) => {

	const classes = useStyles();

	/**
	 * Import global state parts needed
	 */
	const [goToPage, setSelectedSong] = useStore((state) => {
		return [state.goToPage, state.setSelectedSong];
	});

	const handleShowDeletePopup = (_song: ISong | null) => {
		setShowDeletePopup();
	};

	const [anchorEl, setAnchorEl] = React.useState<any | null>(null);

	const handleClick = (event: React.MouseEvent<any>) => {
		setAnchorEl(event.currentTarget);
	};
  
	const handleClose = () => {
		setAnchorEl(null);
	};
  
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;


	const [showDrawer, setShowDrawer] = useState(false);
	const toggleDrawer = () => {
		setShowDrawer((show) => { return !show; });
	};
	

	return (
		<div className={classes.root}>
			<Container maxWidth="md">
				<a href={song?.youtube ? song?.youtube : '#'} rel="noreferrer" target={song?.youtube ? '_blank' : '_self'} className={classes.titleLink}>
					<Typography variant="h4" component="h1" className={classes.title} >
						{song?.title}
					</Typography>
				</a>

				{song?.rhythm && (
					<Box className={classes.inline}>

						<label>Rhythm: </label>
						{song?.rhythm.map((rhythm) => {
							const currentRhythm:string = rythmoi.find((rhythmObj) => {
								return rhythmObj.label === rhythm;
							})?.value.rhythm ?? '';
							return (
								<span key={`${song.id}-${rhythm}`} >
									<Popover
										id={id}
										open={open}
										anchorEl={anchorEl}
										onClose={handleClose}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'center',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'center',
										}}
									><Typography className={classes.popPad}>{currentRhythm}</Typography></Popover>
									<Chip
										size="small"
										onClick={handleClick}
										icon={<InfoIcon/>}
										label={`${rhythm}`}
									/>
								</span>
							);
						})}
					</Box>
				)}
				{song?.dromos && (
					<Box className={classes.inline}>
						<label>Dromos: </label>
						{song?.dromos.map((dromos) => {
							return <Chip key={`${song.id}-${dromos}`} color="primary" size="small" label={dromos} />;
						})}
					</Box>
				)}
				{song?.key && (
					<Box className={classes.inline}>
						<label>Key: </label>
						{song?.key.map((musicKey) => {
							return <Chip key={`${song.id}-${musicKey}`} color="secondary" size="small" label={musicKey} />;
						})}
					</Box>
				)}
				{song?.tempo && (
					<Box className={classes.inline}>
						<label>Tempo: </label>
						<Chip variant="outlined" color="primary" size="small" label={song?.tempo} />
					</Box>
				)}
				{song?.body && <Typography variant="body1" className={classes.mainContent}>{song?.body}</Typography>}
				{song?.notes && (
					<Box className={classes.inline}>
						<label>Notes: </label>
						{song?.notes}
					</Box>
				)}
			</Container>
			<FabMenu toggleDrawer={toggleDrawer}/>
			<Drawer anchor='bottom' open={showDrawer} onClose={toggleDrawer}>
				<Button 
					className={classes.btn} 
					onClick={()=>{
						song && setSelectedSong(song);
						goToPage('edit-song');
					}} 
					variant="contained" 
					color="primary"
					startIcon={<EditIcon />}
				>Edit Song</Button>
				<Button 
					className={classes.btn} 
					onClick={()=>{ 
						song && handleShowDeletePopup(song);
					} } 
					variant="contained" 
					color="secondary"
					startIcon={<DeleteIcon />}
				>Delete Song!!</Button>
			</Drawer>
		</div>
	);
};

export default Song;
