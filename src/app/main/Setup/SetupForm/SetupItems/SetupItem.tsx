import clsx from "clsx";
import React, { FC } from "react";

import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    layout: {
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateAreas: "'title' '.' 'field' '.' 'helpText'",
        gridTemplateRows: "auto 12px auto 12px auto",
    },
    label: {
        gridArea: "title",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: "23px",
        color: theme.content.primary,
        textTransform: "capitalize",
    },
    helpText: {
        gridArea: "helpText",
        fontSize: 14,
        lineHeight: "20px",
        color: theme.content.primary,
        width: 308,
    },
}), { name: "SetupPage" });

interface ISetupItemProps {
    className: string;
    label: string;
    help: string;
}

type Props = ISetupItemProps;

const SetupItem: FC<Props> = (props) => {
    const { className, label, help, children } = props;
    const classes = useStyles();

    return (
        <div className={clsx(classes.layout, className)}>
            <Typography className={classes.label}>
                {label}
            </Typography>

            {children}

            <Typography className={classes.helpText}>
                {help}
            </Typography>
        </div>
    );
};

export { SetupItem };
