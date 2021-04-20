import React, { useContext } from "react";
import appConfig from "./config/app-config";
import SnapshotFirebase from "./components/snapshot-firebase";
import GetFirebase from "./components/get-firebase";
import { AuthContext } from "./components/auth/auth";
import Login from "./components/auth/login";
import './styles/styles.scss';
import "./App.scss";

const App = () => {
	const { user } = useContext(AuthContext);

	if (!user) {
		return <Login />
	}
	
	return (
		<React.Fragment> 
			{appConfig.firebaseSnapshot ? (
				<SnapshotFirebase />
			) : (
				<GetFirebase />
			)}
		</React.Fragment>
	);
}


export default App;