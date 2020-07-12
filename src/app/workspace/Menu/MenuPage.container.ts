import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@WsState";
import { MenuActions} from "./redux";
import { MenuPage, IMenuPageProps, IMenuPageCallProps } from "./MenuPage";

const mapStateToProps = (state: State): IMenuPageProps => ({
    firstPhotoUrl: state.page.indexPage.blocks.content.firstPhotoUrl,
    firstText: state.page.indexPage.blocks.content.firstText,
    phone: state.page.indexPage.blocks.content.phone,
    address: state.page.indexPage.blocks.content.address,
    deliveryTime: state.page.indexPage.blocks.content.deliveryTime,
    deliveryMapUrl: state.page.indexPage.blocks.content.deliveryMapUrl,
});

const mapDispatchToProps = (dispatch: Dispatch): IMenuPageCallProps => ({
    loadData: () => dispatch(MenuActions.loadMenu()),
});

const MenuPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuPage);
export { MenuPageContainer };
