import { ComponentType } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { State } from "@PosState";
import { MenuActions } from "../redux";
import {
    Filters,
    IFiltersProps,
    IFiltersCallProps,
} from "./Filters";

const mapStateToProps = (state: State): Partial<IFiltersProps> => ({
    tagIds: state.menu.tagIds,
    selectedTagId: state.menu.selectedTagId,
});

const mapDispatchToProps = (dispatch: Dispatch): IFiltersCallProps => ({
    onTagChange: (tagId: number) => dispatch(MenuActions.changeSelectedTag({
        tagId,
    })),
});

const FiltersContainer: ComponentType<Partial<IFiltersProps>> = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Filters);
export { FiltersContainer };
