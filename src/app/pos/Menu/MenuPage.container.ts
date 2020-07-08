import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { MenuActions} from "./redux";
import { MenuPage, IMenuPageCallProps } from "./MenuPage";

const mapDispatchToProps = (dispatch: Dispatch): IMenuPageCallProps => ({
    loadData: () => dispatch(MenuActions.loadMenu()),
});

const MenuPageContainer: ComponentType = connect(
    null,
    mapDispatchToProps
)(MenuPage);
export { MenuPageContainer };
