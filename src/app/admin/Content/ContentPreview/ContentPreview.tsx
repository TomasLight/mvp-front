import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { MenuPage, IMenuPageProps, IMenuPageCallProps } from "@ws/Menu";
import { createTheme } from "@shared/theme";

const useStyles = makeStyles({
    root: {
        padding: "20px 30px",
    },
}, { name: "ContentPreview" });

type Props = IMenuPageProps & IMenuPageCallProps;

const ContentPreview = (props: Props) => {
    const { color } = props;
    const classes = useStyles();

    const theme = useMemo(() => {
        if (color) {
            return createTheme(color);
        }
        return createTheme();
    }, [ color ]);

    return (
        <ThemeProvider theme={theme}>
            <MenuPage {...props} classes={{ root: classes.root }} />
        </ThemeProvider>
    );
};

export { ContentPreview, IMenuPageProps as IContentPreviewProps, IMenuPageCallProps as IContentPreviewCallProps };
