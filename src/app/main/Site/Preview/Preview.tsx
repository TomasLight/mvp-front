import { Globe } from "@shared/atoms/icons/GLobe";
import { Translate } from "@utils";
import clsx from "clsx";
import React from "react";

import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { IconVariant } from "@enums";
import { BrowserPreview } from "@main/Site/Preview/BrowserPreview";
import { ColorPreview } from "@main/Site/Preview/ColorPreview";
import { VkPostPreview } from "@main/Site/Preview/VkPostPreview";
import { styles, ClassKey } from "./Preview.styles";

interface IPreviewProps {
    faviconVariant: IconVariant;
    siteName: string;
    siteUrl: string;
    userName: string;
    openGraphImage: string;
    openGraphTitle: string;
    color: string;
}

type Props = IPreviewProps & StyledComponentProps<ClassKey>;

const Preview = (props: Props) => {
    const {
        classes,
        faviconVariant,
        siteName,
        siteUrl,
        userName,
        openGraphImage,
        openGraphTitle,
        color,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.settings}>
                <Globe className={classes.settingsIcon}/>
                <Typography className={classes.settingsTitle}>
                    {Translate.getString("Базовые настройки")}
                </Typography>

                <BrowserPreview
                    classes={{
                        root: clsx(classes.browser, classes.shadow),
                    }}
                    faviconVariant={faviconVariant}
                    siteName={siteName}
                    siteUrl={siteUrl}
                />
            </div>

            <VkPostPreview
                classes={{
                    root: clsx(classes.vk, classes.shadow),
                }}
                userName={userName}
                image={openGraphImage}
                title={openGraphTitle}
                siteUrl={siteUrl}
            />

            <ColorPreview
                classes={{
                    root: clsx(classes.color, classes.shadow),
                }}
                siteName={siteName}
                color={color}
            />
        </div>
    );
};

const componentWithStyles = withStyles<ClassKey>(
    styles,
    { name: "Preview" }
)(Preview);
export { componentWithStyles as Preview, IPreviewProps };
