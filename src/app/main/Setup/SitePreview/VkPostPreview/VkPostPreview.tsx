import React from "react";

import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { styles, ClassKey } from "./VkPostPreview.styles";

interface IVkPostPreviewProps {
    userName: string;
    image: string;
    title: string;
    siteUrl: string;
}

type Props = IVkPostPreviewProps & StyledComponentProps<ClassKey>;

const VkPostPreview = (props: Props) => {
    const {
        classes,
        userName,
        title,
        siteUrl,
    } = props;

    return (
        <div className={classes.root}>
            <Typography className={classes.userName} noWrap>
                {userName}
            </Typography>

            <div className={classes.image} />

            <Typography className={classes.title} noWrap>
                {title}
            </Typography>

            <Typography className={classes.siteUrl} noWrap>
                {siteUrl}
            </Typography>
        </div>
    );
};

const componentWithStyles = withStyles<ClassKey>(
    styles,
    { name: "VkPostPreview" }
)(VkPostPreview);
export { componentWithStyles as VkPostPreview, IVkPostPreviewProps };
