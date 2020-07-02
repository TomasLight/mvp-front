import { createMuiTheme } from "@material-ui/core/styles";

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
    });
}

export { createTheme };
