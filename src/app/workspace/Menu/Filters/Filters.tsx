import React, { SyntheticEvent, useCallback } from "react";
import { StyledComponentProps, withStyles } from "@material-ui/core";

import { Category } from "@ws/Menu/models";
import { Button, ButtonProps } from "@shared/molecules/Button";

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

    const handleClick = useCallback((event: SyntheticEvent) => {
        const categoryId = event.currentTarget.getAttribute(
            nameof<ButtonProps>(o => o.data)
        );

        onCategoryChange(categoryId);
    }, [ onCategoryChange ]);

    return (
        <div className={classes.root}>
            {categories.map((category: Category) => (
                <Button
                    key={`category-${category.id}`}
                    variant="filter"
                    state={{
                        active: category.id === selectedCategory.id,
                    }}
                    onClick={handleClick}
                    data={category.id}
                >
                    {category.name}
                </Button>
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

