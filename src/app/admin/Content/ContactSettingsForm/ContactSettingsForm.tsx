import clsx from "clsx";
import React from "react";

import { makeStyles, Typography, Divider } from "@material-ui/core";

import { Button } from "@shared/molecules/Button";
import { Translate } from "@utils";

import {
    ContactAddress,
    ContactDeliveryLocationLink,
    ContactDeliveryTime,
    ContactFirstBlockText,
    ContactPhone,
    ContactPhoto,
} from "./ContactItems";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateAreas: "\
            'title' \
            'divider' \
            'photo' \
            'firstText' \
            'phone' \
            'address' \
            'time' \
            'link' \
            '.' \
            'button'",
        gridTemplateRows: "\
            auto \
            auto \
            auto \
            auto \
            auto \
            auto \
            auto \
            auto \
            1fr \
            auto",
        gridGap: 20,
        // position: "fixed",
    },
    field: {
        width: "100%",
    },
    title: {
        gridArea: "title",
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "28px",
    },
    divider: {
        gridArea: "divider",
    },
    photo: {
        gridArea: "photo",
    },
    firstText: {
        gridArea: "firstText",
    },
    phone: {
        gridArea: "phone",
    },
    address: {
        gridArea: "address",
    },
    time: {
        gridArea: "time",
    },
    link: {
        gridArea: "link",
    },
    button: {
        width: "100%",
    },
}), { name: "ContactSettingsForm" });

interface IContactSettingsFormProps {
    buttonText: string;
    photoIsLoading: boolean;
    isSaving: boolean;
}

interface IContactSettingsFormCallProps {
    onChangeAddress: (address: string) => void;
    onChangeDeliveryLocationLink: (link: string) => void;
    onChangeDeliveryTime: (time: string) => void;
    onChangeFirstBlockText: (text: string) => void;
    onChangePhone: (phone: string) => void;
    onChangePhoto: (photoFile: File) => void;
    onSubmit: () => void;
}

type Props = IContactSettingsFormProps & IContactSettingsFormCallProps;

const ContactSettingsForm = (props: Props) => {
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

            <ContactPhoto
                classes={{
                    field: clsx(classes.field, classes.photo),
                }}
                isLoading={photoIsLoading}
                onChange={onChangePhoto}
            />

            <ContactFirstBlockText
                classes={{
                    field: clsx(classes.field, classes.firstText),
                }}
                onChange={onChangeFirstBlockText}
            />

            <ContactPhone
                classes={{
                    field: clsx(classes.field, classes.phone),
                }}
                onChange={onChangePhone}
            />

            <ContactAddress
                classes={{
                    field: clsx(classes.field, classes.address),
                }}
                onChange={onChangeAddress}
            />

            <ContactDeliveryTime
                classes={{
                    field: clsx(classes.field, classes.time),
                }}
                onChange={onChangeDeliveryTime}
            />

            <ContactDeliveryLocationLink
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

export { ContactSettingsForm, IContactSettingsFormProps, IContactSettingsFormCallProps };
