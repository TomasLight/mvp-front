import React from "react";
import { DefaultFieldSubscription } from "final-form-app-form";
import { StyledComponentProps, withStyles } from "@material-ui/core";

import { ColorSelectFieldOption } from "@select";
import { ISiteSettingsFormValues } from "@admin/Site/models";
import { SelectFormField } from "@shared/templates";
import { Translate } from "@utils";

import { SiteItem } from "./SiteItem";

type ClassKey = "item" | "field";

interface ISiteColorsProps {
    colorOptions: ColorSelectFieldOption[];
}

interface ISiteColorsCallProps {
    onChange: (siteName: string) => void;
}

type Props = ISiteColorsProps & ISiteColorsCallProps & StyledComponentProps<ClassKey>;

const SiteColors = (props: Props) => {
    const { classes, colorOptions, onChange } = props;

    return (
        <SiteItem
            className={classes.item}
            label={Translate.getString("Цвет")}
            help={Translate.getString("Выберите подходящий цвет. Убедитесь что весь текст на картинке легко читается.")}
        >
            <SelectFormField
                name={nameof<ISiteSettingsFormValues>(o => o.primaryColor)}
                variant={"single-color"}
                options={colorOptions}
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
}, { name: "SetupColors" })(SiteColors);
export { componentWithStyles as SetupColors };
