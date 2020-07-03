import { Translate } from "@utils/translates";
import React, { FC, useEffect, useState } from "react";

import { withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

import { FilterButton } from "./FilterButton";

interface IFiltersProps {
    classes: Partial<ClassNameMap<FiltersClassKey>>;
    tagIds: number[];
    selectedTagId: number;
}

interface IFiltersCallProps {
    onTagChange: (tagId: number) => void;
}

type Props = IFiltersProps & IFiltersCallProps;

const Filters: FC<Props> = (props) => {
    const { classes, tagIds, selectedTagId, onTagChange } = props;

    const handleClick = (tagId) => () => {
        onTagChange(tagId);
    };

    return (
        <div className={classes.root}>
            {tagIds.map((id: number) => (
                <FilterButton
                    key={`tag-${id}`}
                    isActive={id === selectedTagId}
                    onClick={handleClick(id)}
                >
                    {Translate.getString("tag", { id })}
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

