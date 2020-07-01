import React, {
    FunctionComponent,
    PropsWithChildren,
    useEffect, useMemo,
} from "react";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { LoaderBlock } from "@shared/molecules/Loaders/LoaderBlock";

import { AppSnackbarProvider } from "./AppSnackbarProvider";

export interface IAppProviderProps {
    appIsInitialized: boolean;
}

export interface IAppProviderCallProps {
    initialize: () => void;
}

type Props = PropsWithChildren<IAppProviderProps & IAppProviderCallProps>;

const AppProvider: FunctionComponent<Props> = (props: Props) => {
    const {
        appIsInitialized,
        children,

        initialize,
    } = props;

    useEffect(() => {
        initialize();
    }, []);

    const theme = useMemo(() => createMuiTheme(), []);

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
