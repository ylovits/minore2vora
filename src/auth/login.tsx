import React, { useState } from "react";
import firebase from "../firebase";
import "firebase/auth";
import useStore from "store/globalStore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

interface UserData {
	email: string;
	password: string;
}

const Login: React.FC = () => {
	/* Import global state parts needed */
	const [tempUrl] = useStore((state) => {
		return [state.tempUrl];
	});
	const navigate = useNavigate();

	const [values, setValues] = useState({
		email: "",
		password: "",
	} as UserData);

	const login = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(values.email, values.password)
			.then(() => {
				navigate( tempUrl ? tempUrl : "/song-list");
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
				<Box mt="2rem">
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

				</Box>
				<Box mt="2rem">
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
				</Box>
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
