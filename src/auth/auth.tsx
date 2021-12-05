import React, { useState, useEffect } from "react";
import useStore from "store/globalStore";
import firebase from "../firebase";

interface IProps {
    children: React.ReactNode;
}

export interface IFirebaseContext {
    user: firebase.User | null;
    authenticated: boolean;
    setUser: unknown;
    loadingAuthState: boolean;
}

const defaultAuthContext: IFirebaseContext = {
	user: null,
	authenticated: false,
	setUser: null,
	loadingAuthState: true
};

export const AuthContext = React.createContext(defaultAuthContext);

const AuthProvider:React.FC<IProps> = ({children}: IProps) => {

	const [goToPage] = useStore((state) => {
		return [state.goToPage];
	});

	const [user, setUser] = useState(null as firebase.User | null);
	const [loadingAuthState, setLoadingAuthState] = useState(true);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setUser(user);
			goToPage("song-list");
			setLoadingAuthState(false);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);    

	if (loadingAuthState) {
		return (
			<h1>Loading...</h1>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				authenticated: user !== null,
				setUser,
				loadingAuthState
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
