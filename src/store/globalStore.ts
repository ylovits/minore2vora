import * as globalTypes from 'store/globalTypes';
import create from 'zustand';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ISong } from 'interfaces/interfaces';

const initialState = {		
	page: 'login',
	isLoading: true,
	selectedSong: null
};

const useStore = create<globalTypes.IGlobalSate>((set) => {
	return {
		...initialState,
		logOut: () => {
			set((_state) => {
				firebase.auth().signOut();
				return { isLoggedIn: false, userId: '', userEmail: '', isSeniorTutor: false, gameId: '', page: 'login' };
			});
		},

		setIsLoading: (isLoading: boolean) => {
			set((_state) => {
				return { isLoading };
			});
		},

		setSelectedSong: (song: ISong | null) => {
			set((_state) => {
				return { selectedSong: song };
			});
		},

		goToPage: (page: string) => {
			set((_state) => {
				return { page: page };
			});
		},

		setGlobalState: (newState: globalTypes.IGlobalSate) => {
			set((state) => {
				return { ...state, ...newState };
			});
		},
	};
});

export default useStore;
