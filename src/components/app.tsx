import React, { useContext } from 'react';
import SnapshotFirebase from './main-controller/main-controller';
import { AuthContext } from '../auth/auth';
import Login from '../auth/login';
import './app.scss';
// import appConfig from '../config/app-config';
// import GetFirebase from './get-firebase';

const App:React.FC = () => {
	const { user } = useContext(AuthContext);

	if (!user) {
		return <Login />;
	}
	
	return (
		<React.Fragment> 
			<div className="container">
				<SnapshotFirebase />
				{/* ETSI EINAI AMA THELOU ME KAI ME GET METHOD APO FIREBASE 
				{appConfig.firebaseSnapshot ? (
					<SnapshotFirebase />
				) : (
					<GetFirebase />
				)} 
				*/}
			</div>
		</React.Fragment>
	);
};

export default App;