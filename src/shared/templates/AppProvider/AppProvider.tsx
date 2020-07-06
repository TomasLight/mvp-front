import React, {
    FC,
    PropsWithChildren,
    useEffect, useMemo,
} from "react";

import { ThemeProvider } from "@material-ui/core/styles";

import { LoaderBlock } from "@shared/molecules/Loaders";
import { createTheme } from "@shared/theme";

import { AppSnackbarProvider } from "./AppSnackbarProvider";

export interface IAppProviderProps {
    appIsInitialized: boolean;
}

export interface IAppProviderCallProps {
    initialize: () => void;
}

type Props = PropsWithChildren<IAppProviderProps & IAppProviderCallProps>;

const AppProvider: FC<Props> = (props) => {
    const {
        appIsInitialized,
        children,

        initialize,
    } = props;

    useEffect(() => {
        initialize();
    }, []);

    const theme = useMemo(() => createTheme(), []);

    if (!appIsInitialized) {
        return (
            <LoaderBlock isLoading={true}/>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <AppSnackbarProvider>
                {children}
            </AppSnackbarProvider>
        </ThemeProvider>
    );
};

export { AppProvider };
