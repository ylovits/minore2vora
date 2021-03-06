import * as globalTypes from "store/globalTypes";
import create from "zustand";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { persist } from "zustand/middleware";
import { ISong } from "interfaces/interfaces";

const initialState = {		
	isLoading: true,
	selectedSong: null,
	songs: [],
	showComments: false,
	showOnlyReady: false,
	tempUrl: ""
};

const useStore = create<globalTypes.IGlobalSate>(
	persist(
		(set, _get) => { 
			return {
				...initialState,

				logOut: () => {
					firebase.auth().signOut();
					set((_state) => {
						return { songs: [] };
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
				setSongs: (songs: ISong[] | []) => {
					set((_state) => {
						return { songs: songs };
					});
				},
				setShowOnlyReady: (show: boolean) => {
					set((_state) => {
						return { showOnlyReady: show };
					});
				},
				setShowComments: (show: boolean) => {
					set((_state) => {
						return { showComments: show };
					});
				},
				setTempUrl: (url: string) => {
					set((_state) => {
						return { tempUrl: url };
					});
				},
				setGlobalState: (newState: globalTypes.IGlobalSate) => {
					set((state) => {
						return { ...state, ...newState };
					});
				},
			};
		},
		{
			name: "userStore",
		}
	)
);

export default useStore;
