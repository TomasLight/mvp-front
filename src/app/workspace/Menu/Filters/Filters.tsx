import { Category } from "@ws/Menu/models";
import React from "react";

import { StyledComponentProps, withStyles } from "@material-ui/core";

import { FilterButton } from "./FilterButton";

interface IFiltersProps {
    categories: Category[];
    selectedCategory: Category;
}

interface IFiltersCallProps {
    onCategoryChange: (categoryId: string) => void;
}

type Props = IFiltersProps & IFiltersCallProps & StyledComponentProps<FiltersClassKey>;

const Filters = (props: Props) => {
    const { classes, categories, selectedCategory, onCategoryChange } = props;

    const handleClick = (tagId) => () => {
        onCategoryChange(tagId);
    };

    return (
        <div className={classes.root}>
            {categories.map((category: Category) => (
                <FilterButton
                    key={`category-${category.id}`}
                    isActive={category.id === selectedCategory.id}
                    onClick={handleClick(category.id)}
                >
                    {category.name}
                </FilterButton>
            ))}
        </div>
    );
};

type FiltersClassKey =
    | "root"
    ;

const componentWithStyles = withStyles<FiltersClassKey>({
    root: {
        display: "grid",
        gridAutoFlow: "column",
        gridColumnGap: 10,
        justifyItems: "center",
        margin: "0 auto",
    },
}, { name: nameof(Filters) })(Filters);

export { componentWithStyles as Filters, FiltersClassKey, IFiltersProps, IFiltersCallProps };

