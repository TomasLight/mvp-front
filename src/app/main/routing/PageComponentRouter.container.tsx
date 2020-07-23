import { connect } from "react-redux";

import { State } from "@MainState";
import { IPageComponentRouterProps, PageComponentRouter } from "./PageComponentRouter";

const mapStateToProps = (state: State): IPageComponentRouterProps => ({
    hasWorkspace: state.main.hasWorkspace,
});

const PageComponentRouterContainer = connect(
    mapStateToProps
)(PageComponentRouter);

export { PageComponentRouterContainer };

