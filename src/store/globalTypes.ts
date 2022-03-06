import { ISong } from 'interfaces/interfaces';
import { State } from 'zustand';

export interface IGlobalSate extends State {
	isLoading: boolean;
	selectedSong: ISong | null;
	songs:ISong[] | []
	showComments: boolean,
	showOnlyReady: boolean,
	tempUrl: string;
	setSelectedSong:(_song:ISong | null)=>void;
	setSongs:(_songs:ISong[] | [])=>void;
	logOut: () => void;
	setIsLoading: (_bool: boolean) => void;
	setGlobalState: (_newState: IGlobalSate) => void;
	setShowOnlyReady: (_bool: boolean) => void;
	setShowComments: (_bool: boolean) => void;
	setTempUrl: (_url: string) => void;
}
