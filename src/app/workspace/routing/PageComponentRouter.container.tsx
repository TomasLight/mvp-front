import { connect } from "react-redux";

import { State } from "@WsState";
import { IPageComponentRouterProps, PageComponentRouter } from "./PageComponentRouter";

const mapStateToProps = (state: State): IPageComponentRouterProps => ({
    hasWorkspace: !!state.workspace.site.name,
});

const PageComponentRouterContainer = connect(
    mapStateToProps
)(PageComponentRouter);

export { PageComponentRouterContainer };

