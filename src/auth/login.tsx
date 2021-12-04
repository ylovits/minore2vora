import React, { useState } from "react";
import firebase from "../firebase";
import useStore from "store/globalStore";
import "firebase/auth";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface UserData {
	email: string;
	password: string;
}

const Login: React.FC = () => {

	const [goToPage] = useStore((state) => {
		return [state.goToPage];
	});

	const [values, setValues] = useState({
		email: "",
		password: "",
	} as UserData);

	const login = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(values.email, values.password)
			.then(() => {
				goToPage("song-list");
				resetInput();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const resetInput = () => {
		setValues({
			email: "",
			password: "",
		});
	};

	return (
		<form noValidate>
			<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" position="fixed" top="0" right="0" left="0" bottom="0" >
				<Typography variant="h3" component="h4" gutterBottom>
					Login
				</Typography>
				<TextField
					required
					id="standard-required"
					label="Required"
					defaultValue={values.email}
					placeholder="Enter your Email"
					type="text"
					name="email"
					onChange={(e) => {
						return setValues((values) => {
							return { ...values, email: e.target.value };
						});
					}}
				/>
				<TextField
					type="password"
					name="password"
					value={values.password}
					id="standard-password-input"
					label="Password"
					autoComplete="current-password"
					placeholder="Enter your Password"
					onChange={(e) => {
						return setValues((values) => {
							return { ...values, password: e.target.value };
						});
					}}
				/>
				<Box mt="3rem">
					<Button
						onClick={() => {
							return login();
						}}
						variant="contained"
						color="primary"
					>
						Login
					</Button>
				</Box>
			</Box>
		</form>
	);
};
export default Login;
