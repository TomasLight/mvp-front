import React from "react";
import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { Button } from "@shared/molecules/Button";
import { Translate } from "@utils";
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

            <Button variant="default" className={classes.button}>
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
