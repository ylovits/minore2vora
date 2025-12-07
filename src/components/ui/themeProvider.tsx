/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useTheme, createTheme, ThemeProvider as MuiThemeProvider, Theme } from "@mui/material/styles";

interface IProps {
	children: React.ReactNode;
	theme: Theme;
}

export const ThemeDispatchContext = React.createContext<any>(null);

const ThemeProvider: React.FC<IProps> = ({ children, theme }:IProps) => {
	const themeInitialOptions = {
		paletteType: "dark",
	};

	const [themeOptions, dispatch] = React.useReducer((state: any, action: any) => {
		switch (action.type) {
		case "changeTheme":
			return {
				...state,
				paletteType: action.payload,
			};
		default:
			throw new Error();
		}
	}, themeInitialOptions);

	const memoizedTheme = React.useMemo(() => {
		return createTheme({
			...theme,
			components: {
				MuiPopover: {
					styleOverrides: {
						root: {
							zIndex: 35003,
						}
					},
				},
			},
			palette: {
				mode: themeOptions.paletteType,
				primary: {
					main: "#546e7a",
				},
				secondary: {
					main: "#f4511e",
				},
			},
		});
	}, [theme, themeOptions.paletteType]);

	return (
		<MuiThemeProvider theme={memoizedTheme}>
			<ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
		</MuiThemeProvider>
	);
};

export default ThemeProvider;

export const useChangeTheme = (): any => {
	const dispatch = React.useContext(ThemeDispatchContext);
	const theme = useTheme();
	const changeTheme = React.useCallback(() => {
		dispatch({ type: "changeTheme", payload: theme.palette.mode === "light" ? "dark" : "light" });
	}, [theme.palette.mode, dispatch]);	
	return changeTheme;
};

