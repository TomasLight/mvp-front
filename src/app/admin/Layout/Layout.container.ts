import { push } from "connected-react-router";
import { ComponentType } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { CommonState } from "@CommonState";
import { mainUrls } from "@admin/routing/mainUrls";
import { State } from "@AdminState";
import { Translate } from "@utils/translates";
import { Layout, ILayoutProps, ILayoutCallProps, Variant } from "@shared/templates/Layout";

const mapStateToProps = (state: CommonState & State): Partial<ILayoutProps> => {
    const isNewWorkspace = state.main.settingsMode === "create";

    const menuItems = [
        {
            title: Translate.getString("Настройки"),
            url: mainUrls.siteSettings,
        },
        {
            title: Translate.getString("Импорт данных"),
            url: mainUrls.dataSettings,
        },
        {
            title: Translate.getString("Контент"),
            url: mainUrls.contentSettings,
        },
    ];

    return {
        title: state.main.hasWorkspace ? state.main.landingConfig.siteConfig.name : "",
        name: state.main.authorizedUser.getName(),
        menuItems,
        variant: isNewWorkspace ? Variant.AdminNew : Variant.AdminEdit,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ILayoutCallProps => ({
    redirect: (url: string) => dispatch(push(url)),
});

const LayoutContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
export { LayoutContainer };
