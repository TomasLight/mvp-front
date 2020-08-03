import { ComponentType } from "react";
import { connect } from "react-redux";

import { StyledComponentProps } from "@material-ui/core";
import { State } from "@AdminState";
import {
    Filters,
    IFiltersProps,
    IFiltersCallProps, FiltersClassKey,
} from "@ws/Menu/Filters";

const mapStateToProps = (state: State): IFiltersProps => ({
    categories: state.content.fakeMenu.categories,
    selectedCategory: state.content.fakeMenu.selectedCategory,
});

const emptyCallback = () => undefined;
const mapDispatchToProps = (): IFiltersCallProps => ({
    onCategoryChange: emptyCallback,
});

const FiltersContainer: ComponentType<StyledComponentProps<FiltersClassKey>> = connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);
export { FiltersContainer };
