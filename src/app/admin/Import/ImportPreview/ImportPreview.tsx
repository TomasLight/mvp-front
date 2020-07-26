import React from "react";
import { withStyles, Typography, StyledComponentProps } from "@material-ui/core";

import { Translate } from "@utils/translates";

type ClassKeys =
    | "root"
    | "header"
    | "title"
    ;

type Props = StyledComponentProps<ClassKeys>;

const ImportPreview = (props: Props) => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <img src="/images/excel-logo.png"/>
                <Typography variant="h2" className={classes.title}>
                    {Translate.getString("Подготовка данных для импорта")}
                </Typography>
            </div>

            <img src="/images/import-tutorial.png"/>
        </div>
    );
};

const componentWithStyles = withStyles<ClassKeys>({
    root: {
        padding: "56px 36px 56px 0",
    },
    header: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 64,
        marginBottom: 24,
    },
    title: {
        paddingLeft: 24,
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "28px",
    },
})(ImportPreview);
export { componentWithStyles as ImportPreview };
