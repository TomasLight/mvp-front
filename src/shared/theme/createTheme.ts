import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createMuiTheme" {
    interface Theme {
        drawerWidth: number;
    }

    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        drawerWidth?: number;
    }
}

function createTheme() {
    return createMuiTheme({
        palette: {
            primary: {
                main: "#ED6E33",
                contrastText: "#FFF",
            },
            secondary: {
                main: "#000",
                contrastText: "#FFF",
            },
            background: {
                default: "#F3F3F5",
            },
        },
        drawerWidth: 240,
    });
}

export { createTheme };
