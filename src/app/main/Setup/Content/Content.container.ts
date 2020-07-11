import { ComponentType } from "react";
import { connect } from "react-redux";

import { StyledComponentProps } from "@material-ui/core";

import { State } from "@MainState";
import {
    Content,
    IContentProps,
    ClassKey
} from "./Content";

const mapStateToProps = (state: State): IContentProps => {
    return {
        faviconVariant: state.setup.faviconVariant,
        siteName: state.setup.siteName,
        siteUrl: state.setup.siteUrl,
        userName: state.setup.userName,
        openGraphImage: state.setup.openGraphImage,
        openGraphTitle: state.setup.openGraphTitle,
    };
};

const ContentContainer: ComponentType<StyledComponentProps<ClassKey>> = connect(
    mapStateToProps
)(Content);

export { ContentContainer };
