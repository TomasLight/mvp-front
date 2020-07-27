import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { IContactSettingsFormValues } from "@admin/Content/models";
import { DefaultFieldSubscription } from "@shared/organisms";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

type ClassKey = "field";

interface IContactAddressCallProps {
    onChange: (address: string) => void;
}

type Props = IContactAddressCallProps & StyledComponentProps<ClassKey>;

const Address = (props: Props) => {
    const { classes, onChange } = props;

    return (
        <TextFormField
            name={nameof<IContactSettingsFormValues>(o => o.address)}
            label={Translate.getString("адрес")}
            InputProps={{
                placeholder: Translate.getString("Кузнецовская 15"),
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
}, { name: "Address" })(Address);
export { componentWithStyles as Address };
