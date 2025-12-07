import * as globalTypes from "store/globalTypes";
import { create } from "zustand";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { persist } from "zustand/middleware";
import { IFilter, IPlaylist, ISong } from "interfaces/interfaces";

const initialState = {
	isLoading: true,
	selectedSong: null,
	songs: [],
	playlists: [],
	activePlaylist: "",
	showComments: false,
	showOnlyReady: false,
	tempUrl: "",
	filteredBy: [],
	showChords: false,
	showDrawer: false,
	showFilters: false,
	showAvailableLists: false
};

const useStore = create<globalTypes.IGlobalState>()(
	persist(
		(set) => {
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
				setPlaylists: (playlists: IPlaylist[] | []) => {
					set((_state) => {
						return { playlists: playlists };
					});
				},
				setActivePlaylist: (activePlaylist: string) => {
					set((_state) => {
						return { activePlaylist: activePlaylist };
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
				setFilteredBy: (filters: IFilter[] | []) => {
					set((_state) => {
						return { filteredBy: filters };
					});
				},
				setShowChords: (showChords: boolean) => {
					set((_state) => {
						return { showChords: showChords };
					});
				},
				setShowDrawer: (showDrawer: boolean) => {
					set((_state) => {
						return { showDrawer: showDrawer };
					});
				},
				setShowFilters: (showFilters: boolean) => {
					set((_state) => {
						return { showFilters: showFilters };
					});
				},
				setShowAvailableLists: (showAvailableLists: boolean) => {
					set((_state) => {
						return { showAvailableLists: showAvailableLists };
					});
				},
				setGlobalState: (newState: globalTypes.IGlobalState) => {
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
