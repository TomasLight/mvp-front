import { push } from "connected-react-router";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { mainUrls } from "@main/routing/mainUrls";
import { State } from "@MainState";
import { ILayoutCallProps, ILayoutProps, Layout, Variant } from "@shared/templates/Layout";
import { Translate } from "@utils/translates";

const mapStateToProps = (state: State): Partial<ILayoutProps> => ({
    title: Translate.getString("Кофейня Вкусник"),
    menuItems: [
        {
            title: Translate.getString("Main"),
            url: mainUrls.siteSettings,
        },
    ],
    variant: Variant.Workspace,
});

const mapDispatchToProps = (dispatch: Dispatch): ILayoutCallProps => ({
    redirect: (url: string) => dispatch(push(url)),
});

const LayoutContainer: ComponentType = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
export { LayoutContainer };
