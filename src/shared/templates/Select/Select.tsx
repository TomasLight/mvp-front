import React from "react";

import { SelectWrapperProps } from "@shared/organisms/Fields/Select";
import {
    SimpleSingleSelect,
    SingleColorSelect,
    SingleSelectWithIcon,
} from "./SelectVariants";

interface ISelectProps extends SelectWrapperProps {
    variant?:
        | "single-simple"
        | "single-with-icon"
        | "single-color";
}

type Props = ISelectProps;

const Select = (props: Props) => {
    const { variant, ...rest } = props;

    switch (variant) {
        case "single-with-icon":
            return (
                <SingleSelectWithIcon {...rest} />
            );

        case "single-color":
            return (
                <SingleColorSelect {...rest} />
            );

        case "single-simple":
        default:
            return (
                <SimpleSingleSelect {...rest} />
            );
    }
};

export { Select, ISelectProps };
