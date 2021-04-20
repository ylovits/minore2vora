import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import AuthProvider from './auth/auth';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
