import React, { FC, useEffect, useState } from "react";

import {
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    IconButton,
    Typography,
    makeStyles
} from "@material-ui/core";
import { Translate } from "@utils/translates";

import { CartIcon } from "@icons";
import { Dish } from "@pos/Menu/models";
import { CartOperationButtons, SizeButtons } from "./Buttons";

const useStyles = makeStyles((theme) => ({
    actions: {
        display: "grid",

        // replace by commented styles, when will provide dish sizes

        // gridTemplateAreas: "'sizes sizes sizes' '. . .' 'title . add'",
        // gridTemplateRows: "auto 32px 48px",
        gridTemplateAreas: "'title . add'",
        gridTemplateRows: "48px",

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

        "&:hover": {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.primary.main,
        },
    },
}), { name: "FoodItem" });

interface IFoodItemProps {
    dish: Dish;
    amounts: Map<number, number>;
}

interface IFoodItemCallProps {
    openDish: (dishId: string) => void;
    addToCart: (dishId: string, size: number) => void;
    increaseAmount: (dishId: string, size: number) => void;
    decreaseAmount: (dishId: string, size: number) => void;
}

type Props = IFoodItemProps & IFoodItemCallProps;

const FoodItem: FC<Props> = (props) => {
    const {
        dish,
        amounts,
        openDish,
        addToCart,
        increaseAmount,
        decreaseAmount,
    } = props;

    const classes = useStyles();
    const [ selectedSize, setSelectedSize ] = useState<number>(0);

    // useEffect(() => {
    //     if (!dish || dish.sizes.length === 0) {
    //         return;
    //     }
    //     setSelectedSize(dish.sizes[0]);
    // }, [ dish ]);

    const handleOpen = () => {
        openDish(dish.id);
    };

    const handleAddToCart = () => {
        addToCart(dish.id, selectedSize);
    };
    const handleIncrease = () => {
        increaseAmount(dish.id, selectedSize);
    };
    const handleDecrease = () => {
        decreaseAmount(dish.id, selectedSize);
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
                {/*<SizeButtons
                    className={classes.sizes}
                    sizes={dish.sizes}
                    selectedSize={selectedSize}
                    sizeType={dish.sizeType}
                    changeSelectedSize={setSelectedSize}
                />*/}

                <Typography variant="body1" className={classes.title}>
                    {dish.title}
                </Typography>

                <div className={classes.add}>
                    <Typography variant="h5" component="h2" className={classes.cost}>
                        {Translate.getString(`${dish.price} ₽`)}
                    </Typography>

                    {amounts.has(selectedSize)
                        ? (
                            <CartOperationButtons
                                amount={amounts.get(selectedSize)}
                                increaseAmount={handleIncrease}
                                decreaseAmount={handleDecrease}
                            />
                        )
                        : (
                            <IconButton
                                className={classes.cartButton}
                                color="primary"
                                onClick={handleAddToCart}
                            >
                                <CartIcon/>
                            </IconButton>
                        )
                    }
                </div>
            </CardActions>
        </Card>
    );
};

export { FoodItem, IFoodItemProps, IFoodItemCallProps };
