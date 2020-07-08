import { renderFavicon } from "@main/Setup/SetupForm/renderFavicon";
import { IconSelectFieldOption } from "@select";
import React, { FC } from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { ISetupFormValues } from "@main/Setup/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { SelectFormField, TextFormField } from "@shared/templates";
import { Translate } from "@utils";

import { SetupItem } from "./SetupItem";

type ClassKey = "item" | "field";

interface ISetupFaviconProps extends StyledComponentProps<ClassKey> {
    faviconOptions: IconSelectFieldOption[];
}

type Props = ISetupFaviconProps;

const SetupFavicon: FC<Props> = (props) => {
    const { classes, faviconOptions } = props;

    return (
        <SetupItem
            className={classes.item}
            label={Translate.getString("фавикон")}
            help={Translate.getString("Это мини-логотип вашего сайта, который будет отображаться в браузере и в поисковых системах.")}
        >
            <SelectFormField
                name={nameof<ISetupFormValues>(o => o.favicon)}
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
            />
        </SetupItem>
    );
};

const componentWithStyles = withStyles<ClassKey>({
    item: {},
    field: {
        gridArea: "field",
    },
}, { name: "SetupFavicon" })(SetupFavicon);
export { componentWithStyles as SetupFavicon };
