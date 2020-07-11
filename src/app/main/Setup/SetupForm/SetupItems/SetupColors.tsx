import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { ColorSelectFieldOption } from "@select";
import { ISetupFormValues } from "@main/Setup/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { SelectFormField } from "@shared/templates";
import { Translate } from "@utils";

import { SetupItem } from "./SetupItem";

type ClassKey = "item" | "field";

interface ISetupColorsProps {
    colorOptions: ColorSelectFieldOption[];
}

interface ISetupColorsCallProps {
    onChange: (siteName: string) => void;
}

type Props = ISetupColorsProps & ISetupColorsCallProps & StyledComponentProps<ClassKey>;

const SetupColors = (props: Props) => {
    const { classes, colorOptions, onChange } = props;

    return (
        <SetupItem
            className={classes.item}
            label={Translate.getString("Цвет")}
            help={Translate.getString("Выберите подходящий цвет. Убедитесь что весь текст на картинке легко читается.")}
        >
            <SelectFormField
                name={nameof<ISetupFormValues>(o => o.primaryColor)}
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
        </SetupItem>
    );
};

const componentWithStyles = withStyles<ClassKey>({
    item: {},
    field: {
        gridArea: "field",
    },
}, { name: "SetupColors" })(SetupColors);
export { componentWithStyles as SetupColors };
