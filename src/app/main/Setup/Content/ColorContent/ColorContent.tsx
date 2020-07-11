import { Translate } from "@utils";
import React from "react";

import { Button, StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { styles, ClassKey } from "./ColorContent.styles";

interface IColorContentProps {
    color: string;
    siteName: string;
}

type Props = IColorContentProps & StyledComponentProps<ClassKey>;

const ColorContent = (props: Props) => {
    const { classes, siteName } = props;

    return (
        <div className={classes.root}>
            <Typography className={classes.siteName} noWrap>
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
    { name: "ColorContent" }
)(ColorContent);
export { componentWithStyles as ColorContent, IColorContentProps };
