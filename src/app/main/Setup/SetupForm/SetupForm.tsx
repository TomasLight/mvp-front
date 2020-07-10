import React from "react";

import { makeStyles, Button, Typography } from "@material-ui/core";

import { IconSelectFieldOption } from "@select/types";
import { Translate } from "@utils";

import { SetupDomain, SetupSiteName, SetupFavicon, SetupOpenGraph } from "./SetupItems";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "\
            'siteName' '.' \
            'domain' '.' \
            'favicon' '.' \
            'openGraph' '.' \
            'colors' '.' \
            'stepper'",
        gridTemplateRows: "\
            auto 64px \
            auto 60px \
            auto 132px \
            auto 264px \
            auto 80px \
            auto",
    },
    siteName: {
        gridArea: "siteName",
    },
    field: {
        width: 308,
    },
    domain: {
        gridArea: "domain",
    },
    favicon: {
        gridArea: "favicon",
    },
    openGraph: {
        gridArea: "openGraph",
    },
    colors: {
        gridArea: "colors",
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
}), { name: "SetupPage" });

interface ISetupFormProps {
    faviconOptions: IconSelectFieldOption[];
}

interface ISetupFormCallProps {
    onSubmit: () => void;
}

type Props = ISetupFormProps & ISetupFormCallProps;

const SetupForm = (props: Props) => {
    const { faviconOptions, onSubmit } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SetupSiteName
                classes={{
                    item: classes.siteName,
                    field: classes.field,
                }}
            />

            <SetupDomain
                classes={{
                    item: classes.domain,
                    field: classes.field,
                }}
            />

            <SetupFavicon
                classes={{
                    item: classes.favicon,
                    field: classes.field,
                }}
                faviconOptions={faviconOptions}
            />

            <SetupOpenGraph
                classes={{
                    item: classes.openGraph,
                    field: classes.field,
                }}
            />

            <div className={classes.stepper}>
                <Typography variant={"body1"} className={classes.stepperLabel}>
                    {Translate.getString("Шаг 1/3")}
                </Typography>

                <Button onClick={onSubmit} className={classes.stepperButton}>
                    {Translate.getString("Дальше")}
                </Button>
            </div>
        </div>
    );
};

export { SetupForm, ISetupFormProps, ISetupFormCallProps };
