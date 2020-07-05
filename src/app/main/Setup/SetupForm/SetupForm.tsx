import { Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { ISetupFormValues } from "@main/Setup/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "'siteName' '.' 'domain' '.' 'favicon' '.' 'openGraph' '.' 'colors'",
        gridTemplateRows: "auto 64px auto 60px auto 132px auto 60px",
    },
    siteName: {
        gridArea: "siteName",
    },
    field: {
        width: 308,
    },
    label: {
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: "23px",
        paddingBottom: 12,
        color: theme.content.primary,
    },
    helpText: {
        fontSize: 14,
        lineHeight: "20px",
        paddingTop: 12,
        color: theme.content.primary,
        width: 380,
    },
    domain: {
        gridArea: "domain",
    },
    domainAdornment: {
        textTransform: "uppercase",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "19px",
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
}), { name: "SetupPage" });

interface ISetupFormProps {
}

interface ISetupFormCallProps {
}

type Props = ISetupFormProps & ISetupFormCallProps;

const SetupForm: FunctionComponent<Props> = (props) => {
    const {} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.siteName}>
                <Typography className={classes.label}>
                    {Translate.getString("Как назовём сайт?")}
                </Typography>

                <TextFormField
                    name={nameof<ISetupFormValues>((o) => o.siteName)}
                    required

                    subscription={DefaultFieldSubscription}
                    InputProps={{
                        placeholder: Translate.getString("Вкусник доставка кофе и выпечки"),
                    }}
                    FormControlProps={{
                        classes: {
                            root: classes.field,
                        },
                    }}
                />

                <Typography className={classes.helpText}>
                    {Translate.getString("Этот текст будет показываться на вкладке в браузере. Рекомендуем написать название и что-то про доставку :)")}
                </Typography>
            </div>

            <div className={classes.domain}>
                <Typography className={classes.label}>
                    {Translate.getString("Домен")}
                </Typography>

                <TextFormField
                    name={nameof<ISetupFormValues>((o) => o.domain)}
                    required

                    subscription={DefaultFieldSubscription}
                    InputProps={{
                        placeholder: "vkusnikdostavka",
                    }}
                    FormControlProps={{
                        classes: {
                            root: classes.field,
                        },
                    }}
                    customEndAdornment={(
                        <Typography className={classes.domainAdornment}>
                            .bizarre.ru
                        </Typography>
                    )}
                />

                <Typography className={classes.helpText}>
                    {Translate.getString("Это адрес в интернете, по которому будет жить ваш сайт.")}
                </Typography>
            </div>
        </div>
    );
};

export { SetupForm, ISetupFormProps, ISetupFormCallProps };
