import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@WsState";
import { MenuActions} from "./redux";
import { MenuPage, IMenuPageProps, IMenuPageCallProps } from "./MenuPage";

const mapStateToProps = (state: State): IMenuPageProps => ({
    firstPhotoUrl: state.workspace.indexPage.blocks.content.firstPhotoUrl,
    firstText: state.workspace.indexPage.blocks.content.firstText,
    phone: state.workspace.indexPage.blocks.content.phone,
    address: state.workspace.indexPage.blocks.content.address,
    deliveryTime: state.workspace.indexPage.blocks.content.deliveryTime,
    deliveryMapUrl: state.workspace.indexPage.blocks.content.deliveryMapUrl,
});

const mapDispatchToProps = (dispatch: Dispatch): IMenuPageCallProps => ({
    loadData: () => dispatch(MenuActions.loadMenu()),
});

const MenuPageContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuPage);
export { MenuPageContainer };
