import React from "react";

import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { ISetupFormValues } from "@main/Setup/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

import { SetupItem } from "./SetupItem";

type ClassKey = "item" | "field" | "adornment";

interface ISetupDomainCallProps {
    onChange: (domain: string) => void;
}

type Props = ISetupDomainCallProps & StyledComponentProps<ClassKey>;

const SetupDomain = (props: Props) => {
    const { classes, onChange } = props;

    return (
        <SetupItem
            className={classes.item}
            label={Translate.getString("домен")}
            help={Translate.getString("Это адрес в интернете, по которому будет жить ваш сайт.")}
        >
            <TextFormField
                name={nameof<ISetupFormValues>(o => o.domain)}
                InputProps={{
                    placeholder: "vkusnikdostavka",
                }}
                customEndAdornment={(
                    <Typography className={classes.adornment}>
                        .bizarre.ru
                    </Typography>
                )}
                subscription={DefaultFieldSubscription}
                required
                classes={{
                    root: {
                        root: classes.field,
                    },
                }}
                sideOnChange={onChange}
            />
        </SetupItem>
    );
};

const componentWithStyles = withStyles<ClassKey>({
    item: {},
    field: {
        gridArea: "field",
    },
    adornment: {
        textTransform: "uppercase",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "19px",
    },
}, { name: "SetupDomain" })(SetupDomain);
export { componentWithStyles as SetupDomain };
