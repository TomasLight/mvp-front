import clsx from "clsx";
import React from "react";

import { Typography, Divider } from "@material-ui/core";

import { Button } from "@shared/molecules/Button";
import { Translate } from "@utils";

import {
    Address,
    DeliveryLocationLink,
    DeliveryTime,
    FirstBlockText,
    Phone,
    Photo,
} from "./ContentItems";
import { useStyles } from "./ContentSettingsForm.styles";

interface IContentSettingsFormProps {
    buttonText: string;
    photoIsLoading: boolean;
    isSaving: boolean;
}

interface IContentSettingsFormCallProps {
    onChangeAddress: (address: string) => void;
    onChangeDeliveryLocationLink: (link: string) => void;
    onChangeDeliveryTime: (time: string) => void;
    onChangeFirstBlockText: (text: string) => void;
    onChangePhone: (phone: string) => void;
    onChangePhoto: (photoFile: File) => void;
    onSubmit: () => void;
}

type Props = IContentSettingsFormProps & IContentSettingsFormCallProps;

const ContentSettingsForm = (props: Props) => {
    const {
        buttonText,
        photoIsLoading,
        isSaving,
        onChangeAddress,
        onChangeDeliveryLocationLink,
        onChangeDeliveryTime,
        onChangeFirstBlockText,
        onChangePhone,
        onChangePhoto,
        onSubmit,
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>
                {Translate.getString("Контент")}
            </Typography>

            <Divider className={classes.divider}/>

            <Photo
                classes={{
                    field: clsx(classes.field, classes.photo),
                }}
                isLoading={photoIsLoading}
                onChange={onChangePhoto}
            />

            <FirstBlockText
                classes={{
                    field: clsx(classes.field, classes.firstText),
                }}
                onChange={onChangeFirstBlockText}
            />

            <Phone
                classes={{
                    field: clsx(classes.field, classes.phone),
                }}
                onChange={onChangePhone}
            />

            <Address
                classes={{
                    field: clsx(classes.field, classes.address),
                }}
                onChange={onChangeAddress}
            />

            <DeliveryTime
                classes={{
                    field: clsx(classes.field, classes.time),
                }}
                onChange={onChangeDeliveryTime}
            />

            <DeliveryLocationLink
                classes={{
                    field: clsx(classes.field, classes.link),
                }}
                onChange={onChangeDeliveryLocationLink}
            />

            <Button
                variant="form"
                onClick={onSubmit}
                className={classes.button}
                state={{
                    loading: isSaving,
                }}
            >
                {buttonText}
            </Button>
        </div>
    );
};

export { ContentSettingsForm, IContentSettingsFormProps, IContentSettingsFormCallProps };
