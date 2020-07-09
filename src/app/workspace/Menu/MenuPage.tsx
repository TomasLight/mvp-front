import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { FiltersContainer } from "./Filters";
import { FoodContainer } from "./Food";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridAutoFlow: "row",
        gridTemplateAreas: "'image' '.' 'filters' '.' 'menu'",
        gridTemplateRows: "400px 16px 40px 20px 1fr",
    },
    imageContainer: {
        gridArea: "image",
        width: "100%",
        position: "relative",
    },
    image: {
        borderRadius: theme.borderRadius,
        objectFit: "cover",
        height: "100%",
        width: "100%",
    },
    filters: {
        gridArea: "filters",
    },
    menu: {
        gridArea: "menu",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
        gridGap: 20,
    },
}), { name: "MenuPage" });

interface IMenuPageCallProps {
    loadData: () => void;
}

type Props = IMenuPageCallProps;

const MenuPage = (props: Props) => {
    const { loadData } = props;

    useEffect(() => {
        loadData();
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.imageContainer}>
                <img src="/images/image_001.png" className={classes.image}/>
            </div>

            <FiltersContainer
                classes={{
                    root: classes.filters,
                }}
            />

            <FoodContainer classes={{ root: classes.menu }}/>
        </div>
    );
};

export { MenuPage, IMenuPageCallProps };
