import React from "react";
import { DefaultFieldSubscription } from "final-form-app-form";
import { StyledComponentProps, withStyles } from "@material-ui/core";

import { ISiteSettingsFormValues } from "@admin/Site/models";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

import { SiteItem } from "./SiteItem";

type ClassKey = "item" | "field";

interface ISiteNameCallProps {
    onChange: (siteName: string) => void;
}

type Props = ISiteNameCallProps & StyledComponentProps<ClassKey>;

const SiteName = (props: Props) => {
    const { classes, onChange } = props;

    return (
        <SiteItem
            className={classes.item}
            label={Translate.getString("как назовём сайт?")}
            help={Translate.getString("Этот текст будет показываться на вкладке в браузере. Рекомендуем написать название и что-то про доставку :)")}
        >
            <TextFormField
                name={nameof<ISiteSettingsFormValues>(o => o.siteName)}
                InputProps={{
                    placeholder: Translate.getString("Вкусник доставка кофе и выпечки"),
                }}

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
}, { name: "SetupSiteName" })(SiteName);
export { componentWithStyles as SetupSiteName };
