import { ComponentType } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { StyledComponentProps } from "@material-ui/styles";

import { ContentActions } from "@admin/Content/redux";
import { State } from "@AdminState";
import { ClassKey } from "@ws/Menu/MenuPage.styles";
import { FiltersContainer } from "./Filters/Filters.container";
import { FoodContainer } from "./Food/Food.container";
import {
    ContentPreview,
    IContentPreviewProps,
    IContentPreviewCallProps,
} from "./ContentPreview";

const mapStateToProps = (state: State): IContentPreviewProps => {
    const { site, content } = state;
    return {
        firstPhotoUrl: content.photo,
        firstText: content.text,
        color: site.color,
        siteName: site.siteName,
        phone: content.phone,
        address: content.address,
        deliveryTime: content.time,
        deliveryMapUrl: content.link,
        Filters: FiltersContainer,
        Food: FoodContainer,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IContentPreviewCallProps => ({
    loadData: () => dispatch(ContentActions.loadFakeMenu()),
});

const ContentPreviewContainer: ComponentType<StyledComponentProps<ClassKey>> = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentPreview);

export { ContentPreviewContainer };
