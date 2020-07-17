import { push } from "connected-react-router";
import { ComponentType } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { CommonState } from "@CommonState";
import { mainUrls } from "@main/routing/mainUrls";
import { State } from "@MainState";
import { Translate } from "@utils/translates";
import { Layout, ILayoutProps, ILayoutCallProps, Variant } from "@shared/templates/Layout";
import { workspaceUrls } from "@ws/routing";

const mapStateToProps = (state: CommonState & State): Partial<ILayoutProps> => ({
    title: state.main.landingConfig.siteConfig.name,
    name: state.user.authorizedUser.getName(),
    menuItems: [
        {
            title: Translate.getString("Импорт данных"),
            url: mainUrls.dataSettings,
        },
        {
            title: Translate.getString("Контент"),
            url: mainUrls.contentSettings,
        },
        {
            title: Translate.getString("Настройки"),
            url: mainUrls.siteSettings,
        },
        {
            title: Translate.getString("Ресторан"),
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
