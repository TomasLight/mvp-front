import React, { useMemo } from "react";
import { StyledComponentProps, Typography, withStyles } from "@material-ui/core";

import { PhoneIcon } from "@icons";
import { buildAddress } from "./buildAddres";

type ClassKey =
    | "root"
    | "siteName"
    | "address"
    | "phone"
    | "icon"
    ;

interface IContactsProps {
    color: string;
    siteName: string;
    phone: string;
    address: string;
    deliveryTime: string;
}

type Props = IContactsProps & StyledComponentProps<ClassKey>;

const Contacts = (props: Props) => {
    const {
        classes,
        siteName,
        phone,
        address,
        deliveryTime,
    } = props;

    const addressString = useMemo(
        () => buildAddress(address, deliveryTime),
        [ address, deliveryTime ]
    );
    return (
        <div className={classes.root}>
            <Typography className={classes.siteName}>
                {siteName}
            </Typography>

            <Typography className={classes.address}>
                {addressString}
            </Typography>

            <div className={classes.phone}>
                <PhoneIcon className={classes.icon}/>
                <Typography>
                    {phone}
                </Typography>
            </div>
        </div>
    );
};

const componentWithStyles = withStyles<ClassKey, {}, { color: string }>(theme => ({
    root: {
        backgroundColor: props => props.color,
        display: "grid",
        gridTemplateAreas: "\
        '.' \
        'siteName' \
        '.' \
        'address' \
        '.' \
        'phone' \
        '.'",
        gridTemplateRows: "1fr auto 10px auto 19px auto 1fr",
        alignItems: "center",
        justifyItems: "center",
    },
    siteName: {
        gridArea: "siteName",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 36,
        lineHeight: "42px",
    },
    address: {
        gridArea: "address",
        color: "#fff",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: "16px",
        borderRadius: theme.borderRadius,
        backgroundColor: "#000",
        padding: "6px 15px",
    },
    phone: {
        gridArea: "phone",
        display: "grid",
        gridAutoFlow: "column",
        gridGap: 6,
        alignItems: "center",

        "& > p": {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 24,
            lineHeight: "28px",
        },
    },
    icon: {
        color: "#fff",
        fontSize: 20,
        transform: "matrix(-1, 0, 0, 1, 0, 0)",
    },
}), { name: "Contacts" })(Contacts);
export { componentWithStyles as Contacts, IContactsProps };
