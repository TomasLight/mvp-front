import { createMuiTheme } from "@material-ui/core/styles";
import { PaletteColor, PaletteColorOptions } from "@material-ui/core/styles/createPalette";
import { Styles, StyleRules } from "@material-ui/styles/withStyles";
import { overrideInput } from "@shared/theme/overrides/overrideInput";
import { Theme } from "@material-ui/core";

declare module "@material-ui/core" {
    function createStyles<ClassKey extends string, Props extends {}>(
        styles: Styles<Theme, Props, ClassKey>
    ): StyleRules<Props, ClassKey>;
}

declare module "@material-ui/core/styles/createMuiTheme" {
    interface Theme {
        drawerWidth: number;
        borderRadius: number;
        content: {
            primary: string,
            secondary: string,
            tertiary: string,
        };
        payed: PaletteColor;
        disabled: PaletteColor;
        bizarre: string;
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
        payed?: PaletteColor;
        disabled?: PaletteColorOptions;
        bizarre?: string;
    }
}

function createTheme(primaryColor: string = "#ED6E33") {
    return createMuiTheme({
        palette: {
            primary: {
                main: primaryColor,
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
        // @ts-ignore
        payed: {
            main: "#6FCF97",
            contrastText: "#fff",
        },
        disabled: {
            main: "#e7e5e5",
            contrastText: "#b0b0b0",
        },
        bizarre: "#FFC043",
        overrides: {
            ...overrideInput(),
        },
    });
}

export { createTheme };
