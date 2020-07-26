import { Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%",
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
    },
});

const NotFound = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h1">
                404 - Page not found
            </Typography>
        </div>
    );
};

export { NotFound };

