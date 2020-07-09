import React from "react";
import { components } from "react-select";
import { ContainerProps } from "react-select/src/components/containers";

import { FieldBaseProps } from "@shared/organisms/Fields/FieldBase";
import { IFieldOption } from "@select/types";

interface IDefaultSelectContainerProps {
    selectProps?: FieldBaseProps;
}

type Props = IDefaultSelectContainerProps & ContainerProps<IFieldOption>;

const DefaultSelectContainer = (props: Props) => {
    const {
        selectProps: {
            classes,
        },
    } = props;

    return (
        <components.SelectContainer {...props} className={classes.root.root}/>
    );
};

export { DefaultSelectContainer, IDefaultSelectContainerProps };
