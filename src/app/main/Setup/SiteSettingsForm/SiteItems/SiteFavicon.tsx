import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { IconVariant } from "@enums";
import { ISiteSettingsFormValues } from "@main/Setup/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { SelectFormField } from "@shared/templates";
import { IconSelectFieldOption } from "@select";
import { Translate } from "@utils";

import { renderFavicon } from "./renderFavicon";
import { SiteItem } from "./SiteItem";

type ClassKey = "item" | "field";

interface ISiteFaviconProps {
    faviconOptions: IconSelectFieldOption[];
}

interface ISiteDomainCallProps {
    onChange: (faviconVariant: IconVariant) => void;
}

type Props = ISiteFaviconProps
    & ISiteDomainCallProps
    & StyledComponentProps<ClassKey>;

const SiteFavicon = (props: Props) => {
    const { classes, faviconOptions, onChange } = props;

    return (
        <SiteItem
            className={classes.item}
            label={Translate.getString("фавикон")}
            help={Translate.getString("Это мини-логотип вашего сайта, который будет отображаться в браузере и в поисковых системах.")}
        >
            <SelectFormField
                name={nameof<ISiteSettingsFormValues>(o => o.favicon)}
                variant={"single-with-icon"}
                options={faviconOptions}
                renderIcon={renderFavicon}
                subscription={DefaultFieldSubscription}
                required
                classes={{
                    root: {
                        root: classes.field,
                    },
                }}
                sideOnChange={onChange}
            />
        </SiteItem>
    );
};

const componentWithStyles = withStyles<ClassKey>({
    item: {},
    field: {
        gridArea: "field",
    },
}, { name: "SetupFavicon" })(SiteFavicon);
export { componentWithStyles as SetupFavicon };
