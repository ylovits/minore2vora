import { ISong } from 'interfaces/interfaces';
import { State } from 'zustand';

export interface IGlobalSate extends State {
	page: string;
	isLoading: boolean;
	selectedSong: ISong | null;
	songs:ISong[] | []
	setSelectedSong:(_song:ISong | null)=>void;
	setSongs:(_songs:ISong[] | [])=>void;
	logOut: () => void;
	setIsLoading: (_bool: boolean) => void;
	goToPage: (_page: string) => void;
	setGlobalState: (_newState: IGlobalSate) => void;
}
