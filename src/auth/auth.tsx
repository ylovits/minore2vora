import React, { useState, useEffect } from "react";
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

	const [user, setUser] = useState(null as firebase.User | null);
	const [loadingAuthState, setLoadingAuthState] = useState(true);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setUser(user);
			setLoadingAuthState(false);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);    

	if (loadingAuthState) {
		return (
			<div className="loading">
				<h1>Loading...</h1>
			</div>
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
