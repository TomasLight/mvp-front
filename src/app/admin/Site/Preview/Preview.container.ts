import { ComponentType } from "react";
import { connect } from "react-redux";

import { StyledComponentProps } from "@material-ui/core";

import { State } from "@AdminState";
import {
    Preview,
    IPreviewProps,
} from "./Preview";
import { ClassKey } from "./Preview.styles";

const mapStateToProps = (state: State): IPreviewProps => {
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

const PreviewContainer: ComponentType<StyledComponentProps<ClassKey>> = connect(
    mapStateToProps
)(Preview);

export { PreviewContainer };
