import React, { ComponentType, useEffect, useMemo } from "react";
import { withStyles, Typography, StyledComponentProps } from "@material-ui/core";

import { buildAddress } from "@ws/Menu/Contacts/buildAddres";
import { Image } from "@shared/molecules";
import { Contacts } from "@ws/Menu/Contacts/Contacts";
import { styles, ClassKey } from "./MenuPage.styles";

interface IMenuPageProps {
    firstPhotoUrl: string;
    firstText: string;
    color: string;
    siteName: string;
    phone: string;
    address: string;
    deliveryTime: string;
    deliveryMapUrl: string;

    Filters: ComponentType<StyledComponentProps<"root">>;
    Food: ComponentType<StyledComponentProps<"root">>;
}

interface IMenuPageCallProps {
    loadData: () => void;
}

type Props = IMenuPageProps & IMenuPageCallProps & StyledComponentProps<ClassKey>;

const MenuPage = (props: Props) => {
    const {
        classes,
        firstPhotoUrl,
        firstText,
        color,
        siteName,
        phone,
        address,
        deliveryTime,
        deliveryMapUrl,
        loadData,

        Filters,
        Food,
    } = props;

    useEffect(() => {
        loadData();
    }, []);

    const addressString = useMemo(
        () => buildAddress(address, deliveryTime),
        [ address, deliveryTime ]
    );

    return (
        <div className={classes.root}>
            <Image
                src={firstPhotoUrl}
                animation={false}
                classes={{
                    root: classes.image,
                    skeleton: classes.imageSkeleton,
                }}
            >
                <Typography className={classes.firstText} noWrap>
                    {firstText}
                </Typography>

                <Typography className={classes.address} noWrap>
                    {addressString}
                </Typography>
            </Image>

            <Filters classes={{ root: classes.filters }}/>

            <Food classes={{ root: classes.menu }}/>

            <div className={classes.contacts}>
                <Contacts
                    color={color}
                    siteName={siteName}
                    phone={phone}
                    address={address}
                    deliveryTime={deliveryTime}
                />

                <iframe className={classes.map} src={deliveryMapUrl}/>
            </div>
        </div>
    );
};

const componentWithStyles = withStyles<ClassKey>(styles, { name: "MenuPage" })(MenuPage);
export { componentWithStyles as MenuPage, IMenuPageProps, IMenuPageCallProps };
