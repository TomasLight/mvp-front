import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { IContactSettingsFormValues } from "../../models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

type ClassKey = "field";

interface IContactPhoneCallProps {
    onChange: (phone: string) => void;
}

type Props = IContactPhoneCallProps & StyledComponentProps<ClassKey>;

const Phone = (props: Props) => {
    const { classes, onChange } = props;

    return (
        <TextFormField
            name={nameof<IContactSettingsFormValues>(o => o.phone)}
            label={Translate.getString("номер телефона")}
            InputProps={{
                placeholder: Translate.getString("+7 999 777 66 55"),
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
}, { name: "Phone" })(Phone);
export { componentWithStyles as Phone };
