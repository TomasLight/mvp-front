import React from "react";

import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { styles, ClassKey } from "./VkPostContent.styles";

interface IVkPostContentProps {
    userName: string;
    image: string;
    title: string;
    siteUrl: string;
}

type Props = IVkPostContentProps & StyledComponentProps<ClassKey>;

const VkPostContent = (props: Props) => {
    const {
        classes,
        userName,
        image,
        title,
        siteUrl,
    } = props;

    return (
        <div className={classes.root}>
            <Typography className={classes.userName} noWrap>
                {userName}
            </Typography>

            <img className={classes.image} src={image}/>

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
    { name: "VkPostContent" }
)(VkPostContent);
export { componentWithStyles as VkPostContent, IVkPostContentProps };
