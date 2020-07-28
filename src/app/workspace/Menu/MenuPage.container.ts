import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@WsState";
import { MenuActions} from "./redux";
import { MenuPage, IMenuPageProps, IMenuPageCallProps } from "./MenuPage";
import { FiltersContainer } from "./Filters";
import { FoodContainer } from "./Food";

const mapStateToProps = (state: State): IMenuPageProps => ({
    firstPhotoUrl: state.workspace.content.firstPhotoUrl,
    firstText: state.workspace.content.firstText,
    color: state.workspace.site.color,
    siteName: state.workspace.site.name,
    phone: state.workspace.content.phone,
    address: state.workspace.content.address,
    deliveryTime: state.workspace.content.deliveryTime,
    deliveryMapUrl: state.workspace.content.deliveryMapUrl,
    Filters: FiltersContainer,
    Food: FoodContainer,
});

const mapDispatchToProps = (dispatch: Dispatch): IMenuPageCallProps => ({
    loadData: () => dispatch(MenuActions.loadMenu()),
});

const MenuPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuPage);

export { MenuPageContainer };
export default MenuPageContainer;
