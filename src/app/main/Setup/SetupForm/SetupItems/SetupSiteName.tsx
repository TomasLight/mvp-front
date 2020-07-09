import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { ISetupFormValues } from "@main/Setup/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

import { SetupItem } from "./SetupItem";

type ClassKey = "item" | "field";
type Props = StyledComponentProps<ClassKey>;

const SetupSiteName = (props: Props) => {
    const { classes } = props;

    return (
        <SetupItem
            className={classes.item}
            label={Translate.getString("как назовём сайт?")}
            help={Translate.getString("Этот текст будет показываться на вкладке в браузере. Рекомендуем написать название и что-то про доставку :)")}
        >
            <TextFormField
                name={nameof<ISetupFormValues>(o => o.siteName)}
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
            />
        </SetupItem>
    );
};

const componentWithStyles = withStyles<ClassKey>({
    item: {},
    field: {
        gridArea: "field",
    },
}, { name: "SetupSiteName" })(SetupSiteName);
export { componentWithStyles as SetupSiteName };
