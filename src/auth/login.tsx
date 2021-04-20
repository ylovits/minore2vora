import React, { useState } from 'react';
import firebase from '../firebase';
import useStore from 'store/globalStore';
import 'firebase/auth';

interface UserData {
	email: string;
	password: string;
}

const Login:React.FC = () => {

	const [goToPage] = useStore((state) => {
		return [state.goToPage];
	});

	const [values, setValues] = useState({
		email: '',
		password: '',
	} as UserData);

	const login = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(values.email, values.password)
			.then(() => {
				goToPage('song-list');
				resetInput();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const resetInput = () => {
		setValues({
			email: '',
			password: '',
		});
	};

	return (
		<div style={{ textAlign: 'center' }}>
			<h1>Login</h1>
			<input
				type="text"
				name="email"
				value={values.email}
				placeholder="Enter your Email"
				onChange={(e)=> {return setValues((values) => { return {...values, email: e.target.value};});} }
			/>
			<input
				type="password"
				name="password"
				value={values.password}
				placeholder="Enter your Password"
				onChange={(e)=> {return setValues((values) => { return {...values, password: e.target.value};});} }
			/>
			<button onClick={()=>{return login();}}>Login</button>
		</div>
	);
};
export default Login;
