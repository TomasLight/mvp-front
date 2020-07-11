import { IconVariant } from "@enums";
import { IconSelectFieldOption } from "@select";
import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { ISetupFormValues } from "@main/Setup/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { SelectFormField } from "@shared/templates";
import { Translate } from "@utils";

import { renderFavicon } from "./renderFavicon";
import { SetupItem } from "./SetupItem";

type ClassKey = "item" | "field";

interface ISetupFaviconProps {
    faviconOptions: IconSelectFieldOption[];
}

interface ISetupDomainCallProps {
    onChange: (faviconVariant: IconVariant) => void;
}

type Props = ISetupFaviconProps
    & ISetupDomainCallProps
    & StyledComponentProps<ClassKey>;

const SetupFavicon = (props: Props) => {
    const { classes, faviconOptions, onChange } = props;

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
}, { name: "SetupFavicon" })(SetupFavicon);
export { componentWithStyles as SetupFavicon };
