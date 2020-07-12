import { ComponentType } from "react";
import { connect } from "react-redux";

import { StyledComponentProps } from "@material-ui/core";

import { State } from "@MainState";
import {
    Content,
    ISitePreviewProps,
} from "./SitePreview";
import { ClassKey } from "./SitePreview.styles";

const mapStateToProps = (state: State): ISitePreviewProps => {
    return {
        faviconVariant: state.setup.faviconVariant,
        siteName: state.setup.siteName,
        siteUrl: state.setup.siteUrl,
        userName: state.setup.userName,
        openGraphImage: state.setup.openGraphImage,
        openGraphTitle: state.setup.openGraphTitle,
        color: state.setup.color,
    };
};

const SitePreviewContainer: ComponentType<StyledComponentProps<ClassKey>> = connect(
    mapStateToProps
)(Content);

export { SitePreviewContainer };
