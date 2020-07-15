import { connect } from "react-redux";

import { State } from "@MainState";
import {
    PageComponentRouter,
    IPageComponentRouterProps,
} from "./PageComponentRouter";

const mapStateToProps = (state: State): IPageComponentRouterProps => ({
    // hasWorkspaces: !!state.page.indexPage.blocks.site.title,
    settingsMode: state.main.settingsMode,
});

const PageComponentRouterContainer = connect(
    mapStateToProps
)(PageComponentRouter);

export { PageComponentRouterContainer };
