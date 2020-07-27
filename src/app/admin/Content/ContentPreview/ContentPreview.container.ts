import { ComponentType } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { StyledComponentProps } from "@material-ui/styles";

import { ContentActions } from "@admin/Content/redux";
import { Category, Dish } from "@ws/Menu/models";
import { State } from "@AdminState";
import { ClassKey } from "@ws/Menu/MenuPage.styles";
import {
    ContentPreview,
    IContentPreviewProps,
    IContentPreviewCallProps,
} from "./ContentPreview";

let storedDishes: Dish[];
let storedCategory: Category;
let dishesForCategory: Dish[];

function getDishes(dishes: Dish[], selectedCategory: Category) {
    let flag = true;
    if (storedDishes != dishes) {
        storedDishes = dishes;
        flag = false;
    }
    if (storedCategory != selectedCategory) {
        storedCategory = selectedCategory;
        flag = false;
    }

    if (flag) {
        return dishesForCategory;
    }

    let _dishes = [];
    if (selectedCategory) {
        _dishes = dishes.filter(
            dish => selectedCategory.contains(dish.id)
        );
    }
    dishesForCategory = Dish.sort(_dishes);
    return dishesForCategory;
}

const mapStateToProps = (state: State): IContentPreviewProps => {
    const { content } = state;
    const { fakeMenu } = content;
    return {
        primaryColor: state.site.color,
        photo: content.photo,
        firstBlockText: content.text,
        phone: content.phone,
        address: content.address,
        deliveryTime: content.time,
        deliveryLocationLink: content.link,

        categories: fakeMenu.categories,
        selectedCategory: fakeMenu.selectedCategory,
        dishes: getDishes(fakeMenu.dishes, fakeMenu.selectedCategory),
        cart: fakeMenu.cart,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IContentPreviewCallProps => ({
    loadData: () => dispatch(ContentActions.loadFakeMenu()),
});

const ContentPreviewContainer: ComponentType<StyledComponentProps<ClassKey>> = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentPreview);

export { ContentPreviewContainer };
