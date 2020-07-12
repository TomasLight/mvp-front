import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { IContactSettingsFormValues } from "@main/Content/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

type ClassKey = "field";

interface IContactFirstBlockTextCallProps {
    onChange: (text: string) => void;
}

type Props = IContactFirstBlockTextCallProps & StyledComponentProps<ClassKey>;

const ContactFirstBlockText = (props: Props) => {
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
}, { name: "ContactFirstBlockText" })(ContactFirstBlockText);
export { componentWithStyles as ContactFirstBlockText };
