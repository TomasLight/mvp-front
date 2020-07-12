import { Translate } from "@utils";
import React from "react";

import { Button, StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { styles, ClassKey } from "./ColorPreview.styles";

interface IColorPreviewProps {
    color: string;
    siteName: string;
}

type Props = IColorPreviewProps & StyledComponentProps<ClassKey>;

const ColorPreview = (props: Props) => {
    const { classes, siteName } = props;

    return (
        <div className={classes.root}>
            <Typography className={classes.siteName}>
                {siteName}
            </Typography>

            <Button variant="contained" color="secondary" className={classes.button}>
                {Translate.getString("Заказать обратный звонок")}
            </Button>
        </div>
    );
};

const componentWithStyles = withStyles<ClassKey>(
    styles,
    { name: "ColorPreview" }
)(ColorPreview);
export { componentWithStyles as ColorPreview, IColorPreviewProps };
