import React from "react";
import { DefaultFieldSubscription } from "final-form-app-form";
import { StyledComponentProps, withStyles } from "@material-ui/core";

import { IContactSettingsFormValues } from "@admin/Content/models";
import { TextFormField } from "@shared/templates";
import { Translate } from "@utils";

type ClassKey = "field";

interface IContactDeliveryLocationLinkCallProps {
    onChange: (link: string) => void;
}

type Props = IContactDeliveryLocationLinkCallProps & StyledComponentProps<ClassKey>;

const DeliveryLocationLink = (props: Props) => {
    const { classes, onChange } = props;

    return (
        <TextFormField
            name={nameof<IContactSettingsFormValues>(o => o.deliveryLocationLink)}
            label={Translate.getString("зона доставки")}
            InputProps={{
                placeholder: Translate.getString("Вставьте ссылку"),
            }}

            subscription={DefaultFieldSubscription}
            required
            classes={{
                root: {
                    root: classes.field,
                },
            }}
            sideOnChange={onChange}
            helperText={Translate.getString("Вставьте сюда ссылку на вашу карту из яндекса")}
        />
    );
};

const componentWithStyles = withStyles<ClassKey>({
    field: {},
}, { name: "DeliveryLocationLink" })(DeliveryLocationLink);
export { componentWithStyles as DeliveryLocationLink };
