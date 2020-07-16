import { Typography, makeStyles } from "@material-ui/core";
import React from "react";
// import { useLocation } from "react-router-dom";

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
    // const location = useLocation();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h1">
                404 - Page not found
            </Typography>

            {/*<Typography variant="h3">
                <code>{location.pathname}</code>
            </Typography>*/}
        </div>
    );
};

export { NotFound };

