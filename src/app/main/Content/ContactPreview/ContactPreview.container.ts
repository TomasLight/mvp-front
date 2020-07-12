import { ContentActions } from "@main/Content/redux";
import { StyledComponentProps } from "@material-ui/styles";
import { ComponentType } from "react";
import { connect } from "react-redux";

import { State } from "@MainState";
import { ClassKey } from "@ws/Menu/MenuPage.styles";
import { Dispatch } from "redux";
import {
    ContactPreview,
    IContactPreviewProps,
    IContactPreviewCallProps,
} from "./ContactPreview";

const mapStateToProps = (state: State): IContactPreviewProps => ({
    primaryColor: state.setup.color,
    photo: state.content.photo,
    firstBlockText: state.content.text,
    phone: state.content.phone,
    address: state.content.address,
    deliveryTime: state.content.time,
    deliveryLocationLink: state.content.link,

    categories: state.content.fakeMenu.categories,
    selectedCategory: state.content.fakeMenu.selectedCategory,
    dishes: state.content.fakeMenu.dishes,
    cart: state.content.fakeMenu.cart,
});

const mapDispatchToProps = (dispatch: Dispatch): IContactPreviewCallProps => ({
    loadData: () => dispatch(ContentActions.loadFakeMenu()),
});

const ContactPreviewContainer: ComponentType<StyledComponentProps<ClassKey>> = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactPreview);

export { ContactPreviewContainer };
