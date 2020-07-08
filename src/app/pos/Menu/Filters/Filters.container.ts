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
    categories: state.menu.categories,
    selectedCategory: state.menu.selectedCategory,
});

const mapDispatchToProps = (dispatch: Dispatch): IFiltersCallProps => ({
    onCategoryChange: (categoryId: string) => dispatch(
        MenuActions.changeSelectedCategory({
            categoryId,
        })
    ),
});

const FiltersContainer: ComponentType<StyledComponentProps<FiltersClassKey>> = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);
export { FiltersContainer };
