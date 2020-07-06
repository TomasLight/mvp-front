import clsx from "clsx";
import React, { FC } from "react";

import { makeStyles, Button } from "@material-ui/core";

import { FieldBaseProps } from "@shared/organisms/Fields/FieldBase";
import { IFormFieldProps } from "@shared/templates/FormFields/IFormFieldProps";
import { DefaultFieldSubscription } from "@shared/organisms";
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
    },
}), { name: "SetupPage" });

interface ISetupFormProps {
    faviconOptions: IconSelectFieldOption[];
}

interface ISetupFormCallProps {
    onSubmit: () => void;
}

type Props = ISetupFormProps & ISetupFormCallProps;

const SetupForm: FC<Props> = (props) => {
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
                <Button onClick={onSubmit}>
                    {Translate.getString("Дальше")}
                </Button>
            </div>
        </div>
    );
};

export { SetupForm, ISetupFormProps, ISetupFormCallProps };
