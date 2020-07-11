import clsx from "clsx";
import React from "react";

import { Button, makeStyles, Typography } from "@material-ui/core";

import { Translate } from "@utils";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        width: "100%",
        background: "radial-gradient(50% 50% at 50% 50%, #262C37 0%, #1E222B 100%)",
        display: "grid",
        gridTemplateAreas: "\
            '.' 'title' '.' \
            'content' '.' \
            'button' '.'",
        gridTemplateRows: "\
            214px 56px 96px\
            42px 96px\
            64px auto",
        justifyItems: "center",
        alignItems: "center",
    },
    text: {
        color: theme.bizarre,
    },
    title: {
        gridArea: "title",
        fontWeight: "bold",
        fontSize: 48,
        lineHeight: "56px",
    },
    content: {
        gridArea: "content",
        fontSize: 36,
        lineHeight: "42px",
    },
    button: {
        gridArea: "button",
        backgroundColor: theme.payed.main,
        color: theme.payed.contrastText,
        borderRadius: 12,
        fontSize: 20,
        lineHeight: "23px",
        textTransform: "uppercase",
        padding: "20px 42px",

        "&:hover": {
            backgroundColor: "#59B780",
        },
    },
}), { name: "WorkspacesPage" });

interface IHelloPageCallProps {
    redirectToSetupPage: () => void;
}

type Props = IHelloPageCallProps;

const HelloPage = (props: Props) => {
    const { redirectToSetupPage } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h1" className={clsx(classes.text, classes.title)}>
                {Translate.getString("Добро пожаловать в Bizarre")}
            </Typography>

            <Typography className={clsx(classes.text, classes.content)}>
                {Translate.getString("Вы готовы настроить свой первый ресторан?")}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={redirectToSetupPage}
            >
                {Translate.getString("Перейти к созданию")}
            </Button>
        </div>
    );
};

export { HelloPage, IHelloPageCallProps };
