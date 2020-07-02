import {
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    IconButton,
    Typography
} from "@material-ui/core";
import { Translate } from "@utils/translates";
import React, { FunctionComponent, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Cart } from "@shared/atoms/icons";
import { CartItem, Dish } from "@app/Menu/models";

const useStyles = makeStyles((theme) => ({
    actions: {
        display: "grid",
        gridTemplateAreas: "'sizes sizes sizes' 'title . add'",
        gridTemplateColumns: "auto 1fr auto",
        padding: "20px",
    },
    sizes: {
        gridArea: "sizes",
    },
    title: {
        gridArea: "title",
        fontSize: 16,
        lineHeight: "19px",
        fontWeight: 500,
    },
    add: {
        gridArea: "add",
        display: "grid",
        gridTemplateAreas: "'cost cart'",
        gridColumnGap: 10,
        alignItems: "center",
    },
    cost: {
        gridArea: "cost",
        fontSize: 24,
        lineHeight: "28px",
        fontWeight: "bold",
    },
    cartButton: {
        gridArea: "cart",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
}), { name: "FoodItem" });

interface IFoodItemProps {
    dish: Dish;
}

interface IFoodItemCallProps {
    openDish: (dishId: number) => void;
    addToCart: (cartItem: CartItem) => void;
}

type Props = IFoodItemProps & IFoodItemCallProps;

const FoodItem: FunctionComponent<Props> = (props) => {
    const { dish, openDish, addToCart } = props;

    const classes = useStyles();
    const [ selectedSize, setSelectedSize ] = useState<number>(null);

    useEffect(() => {
        if (!dish || dish.sizes.length === 0) {
            return;
        }
        setSelectedSize(dish.sizes[0]);
    }, [ dish ]);

    const handleOpen = () => {
        openDish(dish.id);
    };

    const handleAddToCart = () => {
        addToCart({
            id: dish.id,
            size: selectedSize,
        });
    };

    return (
        <Card elevation={0}>
            <CardActionArea onClick={handleOpen}>
                <CardMedia
                    component="img"
                    alt={dish.title}
                    height="210"
                    image={dish.image}
                    title={dish.title}
                />
            </CardActionArea>

            <CardActions className={classes.actions} disableSpacing>
                <div className={classes.sizes}>
                    sizes
                </div>

                <Typography variant="body1" className={classes.title}>
                    {dish.title}
                </Typography>

                <div className={classes.add}>
                    <Typography variant="h5" component="h2" className={classes.cost}>
                        {Translate.getString(`${dish.cost} ₽`)}
                    </Typography>

                    <IconButton
                        className={classes.cartButton}
                        color="primary"
                        onClick={handleAddToCart}
                    >
                        <Cart/>
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
};

export { FoodItem };
