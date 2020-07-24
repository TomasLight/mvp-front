import React from "react";

import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { ISiteSettingsFormValues } from "@admin/Site/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

import { SiteItem } from "./SiteItem";

type ClassKey = "item" | "field" | "adornment";

interface ISiteDomainProps {
    readonly: boolean;
}

interface ISiteDomainCallProps {
    onChange: (domain: string) => void;
}

type Props = ISiteDomainProps & ISiteDomainCallProps & StyledComponentProps<ClassKey>;

const SiteDomain = (props: Props) => {
    const { classes, readonly, onChange } = props;

    return (
        <SiteItem
            className={classes.item}
            label={Translate.getString("домен")}
            help={Translate.getString("Это адрес в интернете, по которому будет жить ваш сайт.")}
        >
            <TextFormField
                name={nameof<ISiteSettingsFormValues>(o => o.domain)}
                InputProps={{
                    placeholder: "vkusnikdostavka",
                }}
                customEndAdornment={(
                    <Typography className={classes.adornment}>
                        {process.env.MAIN_DOMAIN}
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
                readonly={readonly}
            />
        </SiteItem>
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
}, { name: "SetupDomain" })(SiteDomain);
export { componentWithStyles as SetupDomain };
