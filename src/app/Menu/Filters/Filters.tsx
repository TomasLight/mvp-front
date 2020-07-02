import React, { FC, useEffect, useState } from "react";

import { withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

import { Tag } from "../models";
import { FilterButton } from "./FilterButton";

interface IFiltersProps {
    classes: Partial<ClassNameMap<FiltersClassKey>>;
    tags: Tag[];
}

interface IFiltersCallProps {
    onTagChange: (tagId: number) => void;
}

type Props = IFiltersProps & IFiltersCallProps;

const Filters: FC<Props> = (props) => {
    const { classes, tags, onTagChange } = props;

    const [ selectedTagId, setSelectedTagId ] = useState<number>(null);

    useEffect(() => {
        if (!tags || tags.length === 0) {
            return;
        }
        setSelectedTagId(tags[0].id);
    }, [ tags ]);

    const handleClick = (tagId) => () => {
        setSelectedTagId(tagId);
        onTagChange(tagId);
    };

    return (
        <div className={classes.root}>
            {tags.map((tag: Tag) => (
                <FilterButton
                    key={`tag-${tag.id}`}
                    isActive={tag.id === selectedTagId}
                    onClick={handleClick(tag.id)}
                >
                    {tag.title}
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

