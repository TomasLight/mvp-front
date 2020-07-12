import React from "react";

import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { IconVariant } from "@enums";
import { FavIcon } from "@icons";
import { styles, ClassKey } from "./BrowserPreview.styles";

interface IBrowserPreviewProps {
    faviconVariant: IconVariant;
    siteName: string;
    siteUrl: string;
}

type Props = IBrowserPreviewProps & StyledComponentProps<ClassKey>;

const BrowserPreview = (props: Props) => {
    const {
        classes,
        faviconVariant,
        siteName,
        siteUrl,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.browserHeader}>
                <FavIcon className={classes.favicon} variant={faviconVariant}/>

                <Typography className={classes.siteName} noWrap>
                    {siteName}
                </Typography>
            </div>

            <Typography className={classes.siteUrl} noWrap>
                {siteUrl}
            </Typography>
        </div>
    );
};

const componentWithStyles = withStyles<ClassKey>(
    styles,
    { name: "BrowserPreview" }
)(BrowserPreview);
export { componentWithStyles as BrowserPreview, IBrowserPreviewProps };
