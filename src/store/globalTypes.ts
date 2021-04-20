import { State } from 'zustand';

export interface IGlobalSate extends State {
	page: string;
	isLoading: boolean;
	logOut: () => void;
	setIsLoading: (_bool: boolean) => void;
	goToPage: (_page: string) => void;
	setGlobalState: (_newState: IGlobalSate) => void;
}
