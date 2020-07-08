import { createMuiTheme } from "@material-ui/core/styles";
import { PaletteColor, PaletteColorOptions } from "@material-ui/core/styles/createPalette";
import { overrideInput } from "@shared/theme/overrides/overrideInput";

declare module "@material-ui/core/styles/createMuiTheme" {
    interface Theme {
        drawerWidth: number;
        borderRadius: number;
        content: {
            primary: string,
            secondary: string,
            tertiary: string,
        };
        disabled: PaletteColor;
    }

    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        drawerWidth?: number;
        borderRadius?: number;
        content?: {
            primary: string,
            secondary: string,
            tertiary: string,
        };
        disabled?: PaletteColorOptions;
    }
}

function createTheme(primaryColor: string = "#ED6E33") {
    return createMuiTheme({
        palette: {
            primary: {
                // main: primaryColor,
                main: "#ED6E33",
                contrastText: "#FFF",
            },
            secondary: {
                main: "#000",
                contrastText: "#FFF",
            },
            background: {
                default: "#F3F3F5",
                paper: "#FFF",
            },
        },
        drawerWidth: 240,
        borderRadius: 6,
        content: {
            primary: "#000",
            secondary: "#000",
            tertiary: "#757575",
        },
        disabled: {
            main: "#e7e5e5",
            contrastText: "#b0b0b0",
        },
        overrides: {
            ...overrideInput(),
        },
    });
}

export { createTheme };
