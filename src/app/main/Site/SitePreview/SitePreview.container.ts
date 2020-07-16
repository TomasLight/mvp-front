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
        faviconVariant: state.site.faviconVariant,
        siteName: state.site.siteName,
        siteUrl: state.site.siteUrl,
        userName: state.site.userName,
        openGraphImage: state.site.openGraphImage,
        openGraphTitle: state.site.openGraphTitle,
        color: state.site.color,
    };
};

const SitePreviewContainer: ComponentType<StyledComponentProps<ClassKey>> = connect(
    mapStateToProps
)(Content);

export { SitePreviewContainer };
