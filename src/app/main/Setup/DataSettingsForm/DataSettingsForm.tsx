import React from "react";

import { makeStyles, Button, Typography } from "@material-ui/core";

import { Translate } from "@utils";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "\
            '.' 'title' '.' \
            'stepper'",
        gridTemplateRows: "\
            58px auto 1fr \
            auto",
        height: "100%",
    },
    title: {
        gridArea: "title",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: "23px",
    },
    stepper: {
        gridArea: "stepper",
        display: "grid",
        gridGap: 24,
        gridAutoFlow: "row",
    },
    stepperLabel: {
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "28px",
    },
    stepperButton: {
        backgroundColor: "#6FCF97",
        borderRadius: theme.borderRadius,
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: "23px",
        padding: "12px 16px",
        width: "100%",
    },
}), { name: "DataSettingsForm" });

interface IDataSettingsFormProps {
}

interface IDataSettingsFormCallProps {
    onSubmit: () => void;
}

type Props = IDataSettingsFormProps & IDataSettingsFormCallProps;

const DataSettingsForm = (props: Props) => {
    const {
        onSubmit,
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant={"h1"} className={classes.title}>
                {Translate.getString("Авторизуйтесь в айко чтобы получить каталог")}
            </Typography>

            <div className={classes.stepper}>
                <Typography variant={"body1"} className={classes.stepperLabel}>
                    {Translate.getString("Шаг 2/3")}
                </Typography>

                <Button onClick={onSubmit} className={classes.stepperButton}>
                    {Translate.getString("Дальше")}
                </Button>
            </div>
        </div>
    );
};

export { DataSettingsForm, IDataSettingsFormProps, IDataSettingsFormCallProps };
