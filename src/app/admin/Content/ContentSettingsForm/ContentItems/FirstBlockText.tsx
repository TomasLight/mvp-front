import React from "react";
import { DefaultFieldSubscription } from "final-form-app-form";
import { StyledComponentProps, withStyles } from "@material-ui/core";

import { IContactSettingsFormValues } from "@admin/Content/models";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

type ClassKey = "field";

interface IContactFirstBlockTextCallProps {
    onChange: (text: string) => void;
}

type Props = IContactFirstBlockTextCallProps & StyledComponentProps<ClassKey>;

const FirstBlockText = (props: Props) => {
    const { classes, onChange } = props;

    return (
        <TextFormField
            name={nameof<IContactSettingsFormValues>(o => o.firstBlockText)}
            label={Translate.getString("текст в первом блоке")}
            InputProps={{
                placeholder: Translate.getString("Вкусный кофе и булочки!"),
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
    );
};

const componentWithStyles = withStyles<ClassKey>({
    field: {},
}, { name: "FirstBlockText" })(FirstBlockText);
export { componentWithStyles as FirstBlockText };
