import clsx from "clsx";
import React from "react";

import { makeStyles, Button, Typography, Divider } from "@material-ui/core";

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
            'button'",
        gridGap: 20,
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
        gridArea: "button",
        backgroundColor: "#6FCF97",
        borderRadius: theme.borderRadius,
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: "23px",
        padding: "12px 16px",
        width: "100%",
    },
}), { name: "SiteSettingsForm" });

interface IContactSettingsFormProps {
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

            <Divider className={classes.divider} />

            <ContactPhoto
                classes={{
                    field: clsx(classes.field, classes.photo),
                }}
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

            <Button onClick={onSubmit} variant="contained" className={classes.button}>
                {Translate.getString("Опубликовать сайт")}
            </Button>
        </div>
    );
};

export { ContactSettingsForm, IContactSettingsFormProps, IContactSettingsFormCallProps };
