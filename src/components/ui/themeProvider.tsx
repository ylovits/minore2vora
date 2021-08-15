/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTheme, createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@material-ui/core/styles';

interface IProps {
	children: React.ReactNode;
	theme: Theme;
}

const ThemeDispatchContext = React.createContext<any>(null);

const ThemeProvider: React.FC<IProps> = ({ children, theme }:IProps) => {
	const themeInitialOptions = {
		paletteType: 'light',
	};

	const [themeOptions, dispatch] = React.useReducer((state: any, action: any) => {
		switch (action.type) {
		case 'changeTheme':
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
			overrides: {
				MuiPopover: {
					root: {
						zIndex: 35003,
					}
				},
			},
			palette: {
				type: themeOptions.paletteType,
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
		dispatch({ type: 'changeTheme', payload: theme.palette.type === 'light' ? 'dark' : 'light' });
	}, [theme.palette.type, dispatch]);	
	return changeTheme;
};

