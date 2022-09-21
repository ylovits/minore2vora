import { IFilter, ISong } from "interfaces/interfaces";
export interface IGlobalState {
  isLoading: boolean;
  selectedSong: ISong | null;
  songs: ISong[] | [];
  showComments: boolean;
  showOnlyReady: boolean;
  tempUrl: string;
  filteredBy: IFilter[] | [];
  showChords: boolean;
  showDrawer: boolean;
  showFilters: boolean;
  setSelectedSong: (_song: ISong | null) => void;
  setSongs: (_songs: ISong[] | []) => void;
  logOut: () => void;
  setIsLoading: (_bool: boolean) => void;
  setGlobalState: (_newState: IGlobalState) => void;
  setShowOnlyReady: (_bool: boolean) => void;
  setShowComments: (_bool: boolean) => void;
  setFilteredBy: (_filters: IFilter[] | []) => void;
  setShowChords: (_showChords: boolean) => void;
  setShowDrawer: (_showDrawer: boolean) => void;
  setShowFilters: (_showFilters: boolean) => void;
  setTempUrl: (_url: string) => void;
}
