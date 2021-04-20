import React, { useState } from "react";
import firebase from "../../firebase";
import "firebase/auth";

interface UserData {
	email: string;
	password: string;
}

const Login = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
	} as UserData);

    const login = () => {
        firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then(() => {
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
		<div style={{ textAlign: "center" }}>
			<h1>Login</h1>
            <input
            type="text"
                name="email"
                value={values.email}
                placeholder="Enter your Email"
                onChange={(e)=> setValues((values) => { return {...values, email: e.target.value}}) }
            />
            <input
                type="password"
                name="password"
                value={values.password}
                placeholder="Enter your Password"
                onChange={(e)=> setValues((values) => { return {...values, password: e.target.value}}) }
            />
            <button onClick={()=>login()}>Login</button>
		</div>
	);
};
export default Login;
