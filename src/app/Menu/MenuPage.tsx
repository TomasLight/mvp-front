import React, { FunctionComponent } from "react";

import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FiltersContainer } from "@app/Menu/Filters";

const Image = ({ classes, ...rest }) => (
    <div className={classes.container} {...rest}>
        <img src="/images/image_001.png" className={classes.img} />
    </div>
);
// const Filter = (props) => (<Button {...props}>filter</Button>);
const Item = (props) => (<div {...props}>item</div>);

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
    filters: any[];
    menuItems: any[];
}

type Props = IMenuPageProps;

const MenuPage: FunctionComponent<Props> = (props) => {
    const {
        filters = new Array(5).fill(null),
        menuItems = new Array(5).fill(null),
    } = props;

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
            {/*<div className={classes.filters}>
                {filters.map((item, index) => (
                    <Filter key={`filter-${index}`}/>
                ))}
            </div>*/}

            <div className={classes.menu}>
                {menuItems.map((item, index) => (
                    <Item key={`item-${index}`}/>
                ))}
            </div>
        </div>
    );
};

export { MenuPage };
