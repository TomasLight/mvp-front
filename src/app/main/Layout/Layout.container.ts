import { push } from "connected-react-router";
import { ComponentType } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { State } from "@WsState";
import { Translate } from "@utils/translates";
import { Layout, ILayoutProps, ILayoutCallProps, Variant } from "@shared/templates/Layout";
import { workspaceUrls } from "@ws/routing";

const mapStateToProps = (state: State): Partial<ILayoutProps> => ({
    title: Translate.getString("Кофейня Вкусник"),
    name: "Олег Главненко",
    menuItems: [
        {
            title: Translate.getString("Menu"),
            url: workspaceUrls.menu,
        },
    ],
    variant: Variant.Main,
});

const mapDispatchToProps = (dispatch: Dispatch): ILayoutCallProps => ({
    redirect: (url: string) => dispatch(push(url)),
});

const LayoutContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
export { LayoutContainer };
