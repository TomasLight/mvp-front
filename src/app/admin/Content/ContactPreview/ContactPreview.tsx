import { Image } from "@shared/molecules";
import clsx from "clsx";
import React, { useCallback, useEffect, useMemo } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { Typography, makeStyles } from "@material-ui/core";

import { Cart, Category, Dish } from "@ws/Menu/models";
import { Filters } from "@ws/Menu/Filters";
import { Food } from "@ws/Menu/Food";
import { useStyles as useMenuStyles } from "@ws/Menu/MenuPage.styles";
import { createTheme } from "@shared/theme";
import { Translate } from "@utils";

const useStyles = makeStyles({
    root: {
        padding: "20px 30px",
    },
    photoSkeleton: {
        position: "absolute",
    },
});

interface IContactPreviewProps {
    primaryColor: string;
    photo: string;
    firstBlockText: string;
    phone: string;
    address: string;
    deliveryTime: string;
    deliveryLocationLink: string;

    categories: Category[];
    selectedCategory: Category;
    dishes: Dish[];
    cart: Cart;
}

interface IContactPreviewCallProps {
    loadData: () => void;
}

type Props = IContactPreviewProps & IContactPreviewCallProps;

const ContactPreview = (props: Props) => {
    const {
        primaryColor,
        photo,
        firstBlockText,
        phone,
        address,
        deliveryTime,
        deliveryLocationLink,

        categories,
        selectedCategory,
        dishes,
        cart,
        loadData,
    } = props;

    useEffect(() => {
        loadData();
    }, []);

    const menuClasses = useMenuStyles({ firstPhotoUrl: photo });
    const classes = useStyles();
    const emptyCallback = useCallback(() => undefined, []);

    const theme = useMemo(() => {
        if (primaryColor) {
            return createTheme(primaryColor);
        }
        return createTheme();
    }, [ primaryColor ]);

    let addressString = "";
    if (address && deliveryTime) {
        addressString = Translate.getString(`${address}, доставка ${deliveryTime}`);
    }
    else if (address) {
        addressString = Translate.getString(`${address}`);
    }
    else if (deliveryTime) {
        addressString = Translate.getString(`доставка ${deliveryTime}`);
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={clsx(menuClasses.root, classes.root)}>
                <Image
                    src={photo}
                    animation="wave"
                    classes={{
                        root: menuClasses.image,
                        skeleton: menuClasses.imageSkeleton,
                    }}
                >
                    {firstBlockText && (
                        <Typography className={menuClasses.firstText} noWrap>
                            {firstBlockText}
                        </Typography>
                    )}

                    {addressString && (
                        <Typography className={menuClasses.address} noWrap>
                            {addressString}
                        </Typography>
                    )}
                </Image>

                <Filters
                    classes={{ root: menuClasses.filters }}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={emptyCallback}
                />

                <Food
                    classes={{ root: menuClasses.menu }}
                    dishes={dishes}
                    cart={cart}
                    openDish={emptyCallback}
                    addToCart={emptyCallback}
                    increaseAmount={emptyCallback}
                    decreaseAmount={emptyCallback}
                />
            </div>
        </ThemeProvider>
    );
};

export { ContactPreview, IContactPreviewProps, IContactPreviewCallProps };
