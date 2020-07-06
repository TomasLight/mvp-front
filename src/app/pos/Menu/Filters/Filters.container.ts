import { ComponentType } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { StyledComponentProps } from "@material-ui/core";
import { State } from "@PosState";
import { MenuActions } from "../redux";
import {
    Filters,
    IFiltersProps,
    IFiltersCallProps, FiltersClassKey,
} from "./Filters";

const mapStateToProps = (state: State): IFiltersProps => ({
    tagIds: state.menu.tagIds,
    selectedTagId: state.menu.selectedTagId,
});

const mapDispatchToProps = (dispatch: Dispatch): IFiltersCallProps => ({
    onTagChange: (tagId: number) => dispatch(MenuActions.changeSelectedTag({
        tagId,
    })),
});

const FiltersContainer: ComponentType<StyledComponentProps<FiltersClassKey>> = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);
export { FiltersContainer };
