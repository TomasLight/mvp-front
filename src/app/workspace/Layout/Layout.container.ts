import { push } from "connected-react-router";
import { ComponentType } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { State } from "@WsState";
import { ILayoutCallProps, ILayoutProps, Layout, Variant } from "@shared/templates/Layout";

const mapStateToProps = (state: State): Partial<ILayoutProps> => ({
    title: state.workspace.site.name,
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
