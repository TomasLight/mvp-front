import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { push } from "connected-react-router";

import { State } from "@MainState";
import { Translate } from "@utils/translates";
import { Layout, ILayoutProps, ILayoutCallProps } from "@shared/templates/Layout";
import { mainUrls } from "@main/routing";

const mapStateToProps = (state: State): Partial<ILayoutProps> => ({
    title: Translate.getString("Кофейня Вкусник"),
    menuItems: [
        {
            title: Translate.getString("Каталог"),
            url: "#1",
        },
        {
            title: Translate.getString("Контент"),
            url: "#2",
        },
        {
            title: Translate.getString("Настройки"),
            url: "#3",
        },
        {
            title: Translate.getString("Main"),
            url: mainUrls.setup,
        },
    ],
});

const mapDispatchToProps = (dispatch: Dispatch): ILayoutCallProps => ({
    redirect: (url: string) => dispatch(push(url)),
});

const LayoutContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
export { LayoutContainer };
