import { createTheme, ThemeOptions, PaletteOptions, TypeBackground } from '@mui/material/styles';

declare module '@mui/material/styles' {

	interface ChipTheme {
		workshop: string;
		activity: string;
		techTalk: string;
	}

	interface NeutralTheme {
		light: string;
		dark: string;
	}

	interface CustomPalette {
        neutral: NeutralTheme;
		chip: ChipTheme;
    }

	interface Palette extends CustomPalette {}
	interface PaletteOptions extends CustomPalette {}

	interface ThemeOptions {
		chip?: ChipTheme;
		palette?: PaletteOptions;
	}
}

const themeOptions: ThemeOptions = {
	palette: {
		mode: "dark",
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f50057',
		},
		background: {
			default: "#222222"
		},
		neutral: {
			dark: "#424242",
			light: "#696B6D"
		},
		chip: {
			workshop: '#FF4136',
			activity: '#0074D9',
			techTalk: '#3D9970',
		},
	},
	typography: {
		fontFamily: 'Inter',
	},
};

const theme = createTheme(themeOptions);

export default theme;