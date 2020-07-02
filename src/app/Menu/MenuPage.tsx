import React, { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { FiltersContainer } from "./Filters";
import { FoodContainer } from "./Food";

const Image = ({ classes, ...rest }) => (
    <div className={classes.container} {...rest}>
        <img src="/images/image_001.png" className={classes.img}/>
    </div>
);

const useStyles = makeStyles({
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
        borderRadius: 6,
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
}, { name: "MenuPage" });

interface IMenuPageProps {
    menuItems: any[];
}

type Props = IMenuPageProps;

const MenuPage: FunctionComponent<Props> = (props) => {
    const { } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Image
                classes={{
                    container: classes.imageContainer,
                    img: classes.image,
                }}
            />

            <FiltersContainer
                classes={{
                    root: classes.filters,
                }}
            />

            <FoodContainer classes={{ root: classes.menu }}/>
        </div>
    );
};

export { MenuPage };
