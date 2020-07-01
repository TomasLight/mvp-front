import { Translate } from "@utils/translates/Translate";
import { SnackbarProvider, WithSnackbarProps } from "notistack";
import React, { createRef, FunctionComponent, PropsWithChildren } from "react";

import { Button } from "@material-ui/core";

type Props = PropsWithChildren<any>;

const AppSnackbarProvider: FunctionComponent<Props> = (props: Props) => {
    const { children } = props;

    const snackbarRef = createRef<WithSnackbarProps>();

    const SnackButton = (key: number) => {
        const onClickDismiss = () => {
            snackbarRef.current.closeSnackbar(key);
        };
        return (
            <Button onClick={onClickDismiss} variant={"contained"}>
                {Translate.getString("Dismiss")}
            </Button>
        );
    };

    return (
        <SnackbarProvider
            maxSnack={5}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            ref={snackbarRef}
            action={SnackButton}
        >
            {children}
        </SnackbarProvider>
    );
};

export { AppSnackbarProvider };
