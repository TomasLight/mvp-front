import React, { useEffect} from "react";
import { makeStyles, Typography } from "@material-ui/core";

import { Image } from "@shared/molecules";
import { Translate } from "@utils/translates";
import { Contacts } from "@ws/Menu/Contacts/Contacts";
import { FiltersContainer } from "./Filters";
import { FoodContainer } from "./Food";
import { styles } from "./MenuPage.styles";

const useStyles = makeStyles(styles, { name: "MenuPage" });

interface IMenuPageProps {
    firstPhotoUrl: string;
    firstText: string;
    color: string;
    siteName: string;
    phone: string;
    address: string;
    deliveryTime: string;
    deliveryMapUrl: string;
}

interface IMenuPageCallProps {
    loadData: () => void;
}

type Props = IMenuPageProps & IMenuPageCallProps;

const MenuPage = (props: Props) => {
    const {
        firstPhotoUrl,
        firstText,
        color,
        siteName,
        phone,
        address,
        deliveryTime,
        deliveryMapUrl,
        loadData,
    } = props;

    useEffect(() => {
        loadData();
    }, []);

    const classes = useStyles();

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
                    {Translate.getString(`${address}, доставка ${deliveryTime}`)}
                </Typography>
            </Image>

            <FiltersContainer classes={{ root: classes.filters }}/>

            <FoodContainer classes={{ root: classes.menu }}/>

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

export { MenuPage, IMenuPageProps, IMenuPageCallProps };
